import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js"
// add product
const addProduct = async (req, res) => {
    try {
        const {name, price, description, category, subCategory, sizes, bestSeller} = req.body;

        const image1 = req.files.Image1 && req.files.Image1[0];
        const image2 = req.files.Image2 && req.files.Image2[0];
        const image3 = req.files.Image3 && req.files.Image3[0];
        const image4 = req.files.Image4 && req.files.Image4[0];

        const Images = [image1,image2,image3,image4].filter((item) => item !== undefined);

        const ImagesUrl = await Promise.all(
            Images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path);
                return result.secure_url
            })
        )

        const product = {
            name,
            price: Number(price),
            description,
            category,
            subCategory,
            images: ImagesUrl,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            date: Date.now()
        }

        const newProduct  = new productModel(product);
        await newProduct.save();

        res.json({success: true, message: "Product Added"})
        console.log(ImagesUrl)
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message})
    }
}

// list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        res.json({success: true, products})
    } catch (error) {
        console.log(error)
    }
}

// remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// single product
const signleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {addProduct, listProducts, removeProduct, signleProduct}