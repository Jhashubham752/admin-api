var express = require("express");
var router = express.Router();
var { register, login, forget_password } = require("../Controller/Auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", register);
router.post("/signin", login);
router.post("/forgetpassword", forget_password);

module.exports = router;
