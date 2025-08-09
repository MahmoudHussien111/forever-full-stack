import express from "express";
import {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js"
import auth from "../middleware/auth.js"
const orderRouter = express.Router();
// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

// Payment Methods
orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/stripe', auth, placeOrderStripe);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);

// User Features
orderRouter.post('/userorders', auth, userOrders);

// verify payment
orderRouter.post('/verifyStripe', auth, verifyStripe)
orderRouter.post('/verifyRazorpay', auth, verifyRazorpay)

export default orderRouter