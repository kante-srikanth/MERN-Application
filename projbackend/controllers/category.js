const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err)
      return res.status(400).json({ error: "CATEGORY NOT FOUND IN THE DB" });
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err)
      return res
        .status(400)
        .json({ error: "CANNOT CREATE CATEGORY IN THE DB" });
    return res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err)
      return res
        .status(400)
        .json({ error: "CANNOT GET ALL CATEGORY FROM THE DB" });
    return res.json({ categories });
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) return res.status(400).json({ error: "CANNOT UPDATE CATEGORY" });
    return res.json({ updatedCategory });
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, updatedCategory) => {
    if (err) return res.status(400).json({ error: "CANNOT REMOVE CATEGORY" });
    return res.json({
      err: `${category.name.toUpperCase()} CATEGORY IS SUCCESSFULLY REMOVED FROM THE DB`,
    });
  });
};
