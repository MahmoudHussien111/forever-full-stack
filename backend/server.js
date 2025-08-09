import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoDB from "./config/mongodb.js"
import cloudinaryConnect from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRoute from "./routes/productRouter.js";
import upload from "./middleware/multer.js"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";

// Config Api
const app = express();
const port = process.env.PORT || 4000;
mongoDB();
cloudinaryConnect()
// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// endpoints
app.use('/api/user', userRouter)
app.use('/api/product', upload.fields([{name: 'Image1', maxCount: 1}, {name: 'Image2', maxCount: 1}, {name: 'Image3', maxCount: 1}, {name: 'Image4', maxCount: 1}]), productRoute);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// listen port
app.listen(port, () => console.log("Server Rendering at port " + port));
