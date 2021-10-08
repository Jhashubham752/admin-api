var mongoose = require("mongoose");
var Category = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Category", Category);
