const SubCategory = require("../Model/SubCategory");
const Category = require("../Model/Category");
const uuid = require("uuid").v4;

exports.catgoryId = async (req, res) => {
  const Id = await Category.find();

  res.send(Id);
};

exports.addsubcategory = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      let myimage = req.files.image;
      var imagename = uuid() + req.files.image.name;
      myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
        if (err) throw err;
      });
      req.body.image = imagename;
    }
    const category = await SubCategory.create({
      categoryId: req.body.categoryId,
      title: req.body.title,
      image: req.body.image,
      status: req.body.status,
    });

    res.json(category);
  } catch (error) {
    console.log(error);
  }
};

exports.getsubcategory = async (req, res) => {
  try {
    const Perpage = 4;
    const PAGE_SIZE = parseInt(Perpage);
    const page = parseInt(req.query.page || 1);
    const total = await SubCategory.countDocuments({});

    const users = await SubCategory.find({ new: true })
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

exports.updatesubcategory = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      let myimage = req.files.image;
      var imagename = uuid() + req.files.image.name;
      myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
        if (err) throw err;
      });
      req.body.image = imagename;
    }
    const data = await SubCategory.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.subcategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    res.send(subcategory);
  } catch (error) {
    console.log(error);
  }
};

exports.subcategorydelete = async (req, res) => {
  try {
    let user = await SubCategory.findOneAndDelete({ _id: req.params.id });
    let users = await SubCategory.find();
    if (!user)
      return res.status(400).json({ messge: "Subcategory not deleted" });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

exports.substatus_update = async (req, res) => {
  const status = await SubCategory.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },

    {
      new: true,
      useFindandModify: false,
    }
  );

  res.send({ status });
};

exports.subcategoryCount = async (req, res) => {
  try {
    let count = await SubCategory.count({});
    // console.log("Number of users:", count);
    res.send(200, count);
  } catch (error) {
    console.log(error);
  }
};