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

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err)
        return res
          .status(400)
          .json({ error: "CANNOT GET ALL PRODUCTS FROM THE DB" });
      return res.json({ products });
    });
};

exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "CANNOT UPDATE PRODUCT" });
    }
    //updation of product
    let product = req.product;
    product = _.extend(product, fields);

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
        return res.status(400).json({ error: "UPDATE PRODUCT IN DB FAILED" });
      }
      return res.json(product);
    });
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) return res.status(400).json({ error: "FAILED TO REMOVE PRODUCT" });
    return res.json({
      err: `${deletedProduct.name.toUpperCase()} PRODUCT IS SUCCESSFULLY REMOVED FROM THE DB`,
    });
  });
};

exports.getAllProductCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "LISTING PRODUCT CATEGORIES FAILED" });
    }
    res.json(category);
  });
};

//middlewares
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: !prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) return res.status(400).json({ error: "BULK ACTIONS FAILED" });
    next();
  });
};
