var express = require("express");
var router = express.Router();
const userController = require("../controllers/users");

router.get("/createtable", userController.createTable);
router.get("/", userController.getUsers);
router.post("/", userController.registerUser);
router.delete("/", userController.deleteAll);
router.post("/login", userController.loginUser);
router.get("/getuser", userController.getUser);

module.exports = router;
