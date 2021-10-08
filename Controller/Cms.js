const CMS = require("../Model/Cms");

exports.about = async (req, res) => {
  var aboutus = await CMS.create(req.body);
  res.send(aboutus);
};

exports.getAboutus = async (req, res) => {
  var getaboutus = await CMS.findOne({ _id: req.params.id });
  res.send(getaboutus);
};

exports.update = async (req, res) => {
  try {
    console.log(req.body);
    var update = await CMS.findOneAndUpdate(
      { _id: req.params.id },

      {
        discription: req.body.text,
      },
      { new: true }
    );
    res.send(update);
  } catch (error) {
    console.log(error);
  }
};

exports.createTerm = async (req, res) => {
  var create = await CMS.create(req.body);
  res.send(create);
};

exports.getTerm = async (req, res) => {
  var getTerm = await CMS.findOne({ _id: req.params.id });
  res.send(getTerm);
};

exports.createcontactus = async (req, res) => {
  var create = await CMS.create(req.body);
  res.send(create);
};

exports.getcontactus = async (req, res) => {
  var getcontactus = await CMS.findOne({ _id: req.params.id });
  res.send(getcontactus);
};
