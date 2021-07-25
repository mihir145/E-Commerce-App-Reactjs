const express = require("express");
const router = express.Router();
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);

router.get("/product/photo/:productId", photo);

router.put(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get("/products", getAllProduct);

module.exports = router;
