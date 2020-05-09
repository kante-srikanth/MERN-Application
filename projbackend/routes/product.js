const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getAllProducts,
  getAllProductCategories,
  updateProduct,
  removeProduct,
  photo,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);

//ROUTERS
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.get("/products/", getAllProducts);
router.get("/products/categories", getAllProductCategories);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

module.exports = router;
