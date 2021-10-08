const Product = require("../Model/Product");
const SubCategory = require("../Model/SubCategory");
const uuid = require("uuid").v4;
exports.catgoryId = async (req, res) => {
  const Id = await Product.find();

  res.send(Id);
};

exports.addproduct = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      let myimage = req.files.image;
      var imagename = uuid() + req.files.image.name;
      myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
        if (err) throw err;
      });
      req.body.image = imagename;
    }
    const product = await Product.create({
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      title: req.body.title,
      image: req.body.image,
      status: req.body.status,
    });

    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Perpage = 4;
    const PAGE_SIZE = parseInt(Perpage);
    const page = parseInt(req.query.page || 1);
    const total = await Product.countDocuments({});

    const users = await Product.find({ new: true })
      //.populate("subcat_id")
      .limit(PAGE_SIZE)
      .skip((page - 1) * PAGE_SIZE);

    res.status(200).json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      total: total,
      current_page: page,
      per_page: PAGE_SIZE,
      user: users,
      // data: newImages,
    });
    // const category = await Category.find();

    // res.json(category);
  } catch (error) {
    console.log(error);
  }
};

exports.subcategoryId = async (req, res) => {
  console.log(req.params);
  const subcategory = await SubCategory.find({
    categoryId: req.params.categoryId,
  });
  console.log(subcategory);
  res.send(subcategory);
};

exports.Productdelete = async (req, res) => {
  try {
    let user = await Product.findOneAndDelete({ _id: req.params.id });
    let users = await Product.find();
    if (!user) return res.status(400).json({ messge: "user not deleted" });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      let myimage = req.files.image;
      var imagename = uuid() + req.files.image.name;
      myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
        if (err) throw err;
      });
      req.body.image = imagename;
    }
    const data = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.product = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id }, req.body, {
      new: true,
    });

    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

exports.prostatus_update = async (req, res) => {
  const status = await Product.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },

    {
      new: true,
      useFindandModify: false,
    }
  );

  console.log("STATUS", status);

  res.send({ status });
};

exports.ProductCount = async (req, res) => {
  try {
    let count = await Product.count({});
    // console.log("Number of users:", count);
    res.send(200, count);
  } catch (error) {
    console.log(error);
  }
};