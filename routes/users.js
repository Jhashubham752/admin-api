var express = require("express");
var router = express.Router();

var {
  user_update,
  getuser,
  allusers,
  userdelete,
  createuser,
  userCount,
  updatePassword,
} = require("../Controller/user");
const { create } = require("../Model/Auth");

/* GET users listing. */

router.get("/users", allusers);

router.get("/users/:id", getuser);

router.put("/users/:id", user_update);

router.delete("/users/:id", userdelete);

router.post("/users", createuser);

router.get("/userscount", userCount);
router.put("/updatePassword/:id", updatePassword);

module.exports = router;
