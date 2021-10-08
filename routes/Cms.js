var express = require("express");
var router = express.Router();
var {
  about,
  getAboutus,
  update,
  createTerm,
  getTerm,
  createcontactus,
  getcontactus,
} = require("../Controller/Cms");

router.post("/about", about);
router.get("/getabout/:id", getAboutus);
router.put("/update/:id", update);

router.post("/term", createTerm);
router.get("/getterm/:id", getTerm);

router.post("/contact", createcontactus);
router.get("/getcontactus/:id", getcontactus);

module.exports = router;
