const Product = require("../models/product");
const category = require("../models/category");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err)
        return res
          .status(400)
          .json({ error: "PRODUCT IS NOT FOUND IN THE DB" });
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "CANNOT CREATE PRODUCT" });
    }

    //DESTRUCTURE THE FIELDS
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      res.status(400).json({ error: "PLEASE INCLUDE ALL FIELDS" });
    }

    let product = new Product(fields);

    //FILE HANDLING
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "FILE SIZE IS TOO BIG" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //SAVE FILE TO THE DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "SAVING PRODUCT IN DB FAILED" });
      }
      return res.json(product);
    });
  });
};
