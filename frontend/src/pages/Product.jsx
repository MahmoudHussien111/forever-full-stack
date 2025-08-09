import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {ShopContext} from "../context/ShopContext"
import { assets } from '../assets/assets';
import Title from "../components/Title"
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products, curency, addToCart} = useContext(ShopContext)
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.images[0]);
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 border-gray-100 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex flex-col-reverse gap-3 flex-1 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.images.map((item, i) => (
                <img onClick={()=>setImage(item)} src={item} className='w-[24%] flex-shrink-0 sm:w-full sm:mb-3 cursor-pointer'  key={i} alt="" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className="flex gap-1 mt-2 items-center">
              <img src={assets.star_icon} className='w-3' alt="" />
              <img src={assets.star_icon} className='w-3' alt="" />
              <img src={assets.star_icon} className='w-3' alt="" />
              <img src={assets.star_icon} className='w-3' alt="" />
              <img src={assets.star_dull_icon} className='w-3' alt="" />
              <p className='pl-2'>(122)</p>
          </div>
          <h1 className='mt-5 text-3xl font-medium'>{curency}{productData.price}</h1>
          <p className='mt-5 text-gray-500 md:w-3/4'>{productData.description}</p>
          <div className="flex flex-col gap-2 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 items-center">
              {productData.sizes.map((item, i) => (
                <p key={i} onClick={()=>setSize(item)} className={`bg-gray-100 border border-gray-100 px-4 py-2 cursor-pointer ${item === size ? 'border-orange-500' : ''}`}>{item}</p>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-2 active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 text-gray-200' />
          <div className="mt-5 text-sm text-gray-500 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
              <div className="flex">
                <b className='border border-gray-200 px-5 py-3 text-sm'>Description</b>
                <p className='border border-gray-200 px-5 py-3 text-sm'>Reviews (122)</p>
              </div>
              <div className=" text-gray-500 text-sm flex flex-col gap-4 py-6 px-6 border border-gray-200">
                <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
              </div>
      </div>

      <div className="mt-20">
        <div className="text-center py-3 text-3xl">
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>
        <RelatedProducts category={productData.category} subcategory={productData.subCategory} />
      </div>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product