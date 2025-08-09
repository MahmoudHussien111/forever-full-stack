import express from "express";
const cartRouter = express.Router();
import {addCart, updateCart, getUserCart} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

cartRouter.post('/add', auth, addCart);
cartRouter.post('/update', auth, updateCart);
cartRouter.post('/get', auth, getUserCart);

export default cartRouter;