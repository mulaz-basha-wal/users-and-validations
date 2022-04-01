const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connector = require("../poolconnect");
const authentication = require("../middlewares/authentication");
let salt = bcrypt.genSaltSync(10);

const createTable = (req, res) => {
  connector.query(
    "CREATE TABLE users_exam (id int primary key, username VARCHAR(50),  password VARCHAR(200));",
    (err, results) => {
      res.json({ err, results });
    }
  );
};

const deleteAll = (req, res) => {
  connector.query("truncate table users_exam", function (err, results) {
    res.json({ err, results });
  });
};

const getUsers = (req, res) => {
  connector.query("select * from users_exam", function (err, results) {
    res.json({ err, results });
  });
};

const getUser = [
  authentication,
  (req, res) => {
    console.log(123, req.user);
    connector.query(
      "select * from users_exam where username=?",
      [req.user.username],
      (err, results) => {
        res.json({ err, results });
      }
    );
  },
];

const registerUser = (req, res) => {
  const { id, username, password } = req.body;
  let encryptedPassword;
  try {
    encryptedPassword = bcrypt.hashSync(password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log("Error in bcrypt");
  }
  const sql = "INSERT INTO users_exam VALUES(?,?,?)";
  connector.query(sql, [id, username, encryptedPassword], (error, result) => {
    res.json({ error, result });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users_exam where username=?";
  connector.query(sql, [username], async (error, result) => {
    console.log("entered");
    if (result.length === 0) {
      console.log("user not found");
      res.status(200).json({ status: 0, debug_data: "user not found" });
    } else {
      const passCorrect = await bcrypt.compareSync(
        password,
        result[0].password
      );
      if (!passCorrect) {
        res
          .status(400)
          .json({ status: 0, debug_data: "user credential wrong" });
      } else {
        const payload = {
          user: {
            username,
            password,
          },
        };
        console.log(payload);
        jwt.sign(payload, "secret_code", { expiresIn: 1200 }, (err, token) => {
          if (err) {
            res
              .status(400)
              .json({ status: 0, debug_data: "temp error in backend" });
          } else {
            res.status(200).json({ token });
          }
        });
      }
    }
  });
};

module.exports = {
  createTable,
  getUsers,
  registerUser,
  loginUser,
  deleteAll,
  getUser,
};
