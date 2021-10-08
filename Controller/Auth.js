var Joi = require("joi");
var bcrypt = require("bcrypt");
const User = require("../Model/Auth");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(200).email(),
    password: Joi.string().min(6).max(200),
  });

  delete req.body.confirm_password;
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

  const jwtSecretKey = process.env.SECRET_KEY;
  const token = jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    jwtSecretKey
  );

  res.send({ token, user });
};

exports.login = async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().min(3).max(200).email(),
    password: Joi.string().min(3).max(200),
  });
  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).json({ message: "validation error" });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ message: "Invalid email address or password" });

  let validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword)
    return res.status(400).json({ message: "incorrect password" });

  const jwtSecretKey = process.env.SECRET_KEY;
  const token = await jwt.sign(
    { _id: user._id, fullName: user.fullName, email: user.email },
    jwtSecretKey
  );
  res.send({ user, token });
};

exports.forget_password = async (req, res) => {
  if (req.body.email === null) {
    res.json("email field is required");
  }

  const user = await User.findOne({ email: req.body.email });
  if (user == null) return res.json("email is not registered");

  var otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);


  var transporter = nodemailer.createTransport({
    host: "smpt.gmail.com",
    port: 587,
    auth: {
      user: "shadowlinesgroup@gmail.com",
      pass: "welcome123*",
    },
  });

  var mailOptions = {
    from: "shadowlinesgroup@gmail.com",
    to: req.body.email,
    subject: "Reset Password",
    html: "Your OTP is-" + otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error), "............errrrr";
    } else {
      //req.sssion.email = req.body.email;
      User.findOneAndUpdate({ email: req.body.email }, { otp: otp });

      res.json({ otp }, 'OTP sent successfully"');
      console.log("Email sent: " + info.response);
    }
  });
};

// exports.sendEmail = async (email, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smpt.gmail.com",
//       service: "Gmail",
//       port: 587,
//       secure: true,
//       auth: {
//         user: "shadowlinesgroup@gmail.com",
//         pass: "welcome123*",
//       },
//     });

//     await transporter.sendMail({
//       from: "shadowlinesgroup@gmail.com",
//       to: req.body.email,
//       subject: "Reset Password",
//       text: "Change Password",
//     });

//     console.log("email sent sucessfully");
//   } catch (error) {
//     console.log(error, "email not sent");
//   }
// };
