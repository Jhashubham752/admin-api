var express = require("express");
const {
  addcategory,
  getCategory,
  updateCategory,
  category,
  categorydelete,
  status_update,
  catstatus_update,
  CategoryCount,
} = require("../Controller/Category");
const {
  addproduct,
  getProduct,
  subcategoryId,
  Productdelete,
  updateProduct,
  product,
  prostatus_update,
  ProductCount,
} = require("../Controller/Product");
const {
  addsubcategory,
  getsubcategory,
  updatesubcategory,
  subcategory,
  subcategorydelete,
  substatus_update,
  subcategoryCount,
} = require("../Controller/SubCategory");
var router = express.Router();

//=============Category============================
router.post("/category", addcategory);
router.get("/category", getCategory);
router.put("/category/:id", updateCategory);
router.get("/getcategory/:id", category);
router.delete("/category/:id", categorydelete);
router.put("/catstatus/:id", catstatus_update);
router.get("/categorycount", CategoryCount);
//===============subCategory=======================

router.post("/subcategory", addsubcategory);
router.get("/subcategory", getsubcategory);
router.put("/Subcategory/:id", updatesubcategory);
router.get("/getsubcategory/:id", subcategory);
router.delete("/subcategory/:id", subcategorydelete);
router.put("/substatus/:id", substatus_update);
router.get("/subcategorycount", subcategoryCount);

//======================Product==============
router.post("/product", addproduct);
router.get("/product/", getProduct);
router.get("/subCategoryid/:categoryId", subcategoryId);
router.delete("/product/:id", Productdelete);
router.put("/product/:id", updateProduct);
router.get("/getproduct/:id", product);
router.put("/prostatus/:id", prostatus_update);
router.get("/productcount", ProductCount);

module.exports = router;
