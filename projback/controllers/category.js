const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "No Category Found.",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  if (req.body.name == "") {
    return res.status(400).json({
      error: "Category Must Have name!",
    });
  }
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category.",
      });
    }
    return res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories Found.",
      });
    }

    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Category.",
      });
    }
    return res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.body.name;
  category.name = req.body.name;
  Category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this Category.",
      });
    }

    return res.json({
      message: "Successfully Deleted.",
    });
  });
};
