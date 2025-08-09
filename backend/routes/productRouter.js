import express from "express";
import { addProduct, listProducts, removeProduct, signleProduct } from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js"
const productRoute = express.Router();

productRoute.post('/add', adminAuth, addProduct);
productRoute.get('/list',  listProducts);
productRoute.post('/remove',adminAuth, removeProduct);
productRoute.post('/single', signleProduct)

export default productRoute