const express = require("express");
const router = express.Router();
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { isSignedin, isAdmin, isAuthenticated } = require("../controllers/auth");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");
const { updateStock } = require("../controllers/product");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedin,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get(
  "/order/all/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  "/order/:orderId/status/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
