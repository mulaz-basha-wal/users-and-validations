const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("Entered middlw ware");
  const token = req.header("token");
  if (!token) {
    console.log("no token");
    res.status(401).json({ status: 0, debug_msg: "Token not found" });
  } else {
    console.log("token found");
    console.log(token);
    jwt.verify(token, "secret_code", (err, decoded) => {
      if (err) {
        console.log("fucking err token invalid");
        res
          .status(401)
          .json({ status: 0, debug_msg: "Token sent is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
};
