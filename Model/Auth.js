var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
  fullName: { type: String, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  otp: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("User", Schema);
