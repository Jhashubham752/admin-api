var mongoose = require("mongoose");
let { ObjectId } = require("mongoose");
var Product = new mongoose.Schema({
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },

  subcategoryId: {
    type: ObjectId,
    ref: "SubCategory",
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Product", Product);
