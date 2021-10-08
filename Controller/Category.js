const Category = require("../Model/Category");
const uuid = require("uuid").v4;
const Product = require("../Model/Product");

exports.addcategory = async (req, res) => {
  if (req.files && req.files.image) {
    let myimage = req.files.image;
    var imagename = uuid() + req.files.image.name;
    myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
      if (err) throw err;
    });
    req.body.image = imagename;
  }
  const category = await Category.create({
    title: req.body.title,
    image: req.body.image,
    status: req.body.status,
  });
  await Category.findOne({ title: req.body.title });
  if (Category)
    return res.status(400).json({ message: "Category Already exists..." });

  res.json(category);
};

exports.getCategory = async (req, res) => {
  try {
    const Perpage = 4;
    const PAGE_SIZE = parseInt(Perpage);
    const page = parseInt(req.query.page || 1);
    const total = await Category.countDocuments({});

    const users = await Category.find({ new: true })
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

exports.updateCategory = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      let myimage = req.files.image;
      var imagename = uuid() + req.files.image.name;
      myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
        if (err) throw err;
      });
      req.body.image = imagename;
    }
    const update = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(update);
  } catch (error) {
    console.log(error);
  }
};

exports.category = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id }, req.body, {
      new: true,
    });

    res.send(category);
  } catch (error) {
    console.log(error);
  }
};

exports.categorydelete = async (req, res) => {
  try {
    let user = await Category.findOneAndDelete({ _id: req.params.id });
    let users = await Category.find();
    if (!user) return res.status(400).json({ messge: "user not deleted" });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};
exports.catstatus_update = async (req, res) => {
  const status = await Category.findOneAndUpdate(
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
exports.CategoryCount = async (req, res) => {
  try {
    let count = await Category.count({});
    // console.log("Number of users:", count);
    res.send(200, count);
  } catch (error) {
    console.log(error);
  }
};
