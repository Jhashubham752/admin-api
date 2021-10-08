const User = require("../Model/Auth");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const Joi = require("joi");

exports.getuser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  res.json(user);
};

exports.user_update = async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },

      req.body,
      { new: true }
    );
    console.log("user", user);

    if (!user) return res.status(400).json({ message: "user not updated" });

    res.json(user);
  } catch (err) {
    if (err) throw err;
    console.log(" server error");
  }
};

exports.allusers = async (req, res) => {
  try {
    console.log("HIIIIIIIII");
    // return;
    // const Perpage = 4;
    // const PAGE_SIZE = parseInt(Perpage);
    // const page = parseInt(req.query.page || 1);
    // const total = await User.countDocuments({});

    // const users = await User.find()
    //   //.populate("subcat_id")
    //   .limit(PAGE_SIZE)
    //   .skip((page - 1) * PAGE_SIZE);

    // res.status(200).json({
    //   totalPages: Math.ceil(total / PAGE_SIZE),
    //   total: total,
    //   current_page: page,
    //   per_page: PAGE_SIZE,
    //   // data: newImages,
    // });

    let users = await User.find();

    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};
exports.createuser = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(200).email(),
    password: Joi.string().min(6).max(200),
  });

  //delete req.body.confirm_password;
  const { error } = schema.validate(req.body);
  console.log("ERROR", error);
  if (error) return res.status(400).json({ message: "validation error" });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User Already exists..." });

  const { fullName, email, password } = req.body;
  user = new User({ fullName, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  let created = await user.save();
  // if (created) return res.status(200).json({ message: "User Created..." });

  res.json(user);
};

exports.userdelete = async (req, res) => {
  try {
    let user = await User.findOneAndDelete({ _id: req.params.id });
    let users = await User.find();
    if (!user) return res.status(400).json({ messge: "user not deleted" });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

exports.userCount = async (req, res) => {
  try {
    let count = await User.count({});
    // console.log("Number of users:", count);
    res.send(200, count);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.id });

    if (!(await compare(req.body.currentPassword, user.password))) {
      return res.status(401).json({ msg: "Your current password is wrong." });
    }

    user.password = req.body.password;
    await user.save();
    return res.status(200).json({ msg: "Password Update successfull" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};   