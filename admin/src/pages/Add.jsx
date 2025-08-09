import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import {backend} from "../App"
import { toast } from 'react-toastify'
const Add = ({token}) => {

  const [productData, setProductData] = useState({Image1: '', Image2: '', Image3: '', Image4: '', name: '', description: '', category: 'Men', subCategory: 'Topwear', price: '', sizes: [], bestSeller: false});

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name',productData.name);
      formData.append('description',productData.description);
      formData.append('category',productData.category);
      formData.append('subCategory',productData.subCategory);
      formData.append('price',productData.price);
      formData.append('sizes',JSON.stringify(productData.sizes));
      formData.append('bestseller',productData.bestSeller);
      productData.Image1 && formData.append('Image1',productData.Image1);
      productData.Image2 && formData.append('Image2',productData.Image2);
      productData.Image3 && formData.append('Image3',productData.Image3);
      productData.Image4 && formData.append('Image4',productData.Image4);

      const response = await axios.post(backend + '/api/product/add',formData,{headers:{token}});
      if (response.data.success) {
        toast.success('Product Added');
        setProductData({Image1: '', Image2: '', Image3: '', Image4: '', name: '', description: '', category: 'Men', subCategory: 'Topwear', price: '', sizes: [], bestSeller: false})
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmitForm} className='w-full flex flex-col items-start gap-5'>
      <div>
        <p className='mb-2 font-medium'>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="Image1">
            <img className='w-20' src={!productData.Image1 ? assets.upload_area : URL.createObjectURL(productData.Image1)} alt="" />
            <input onChange={(e)=>setProductData({...productData, Image1: e.target.files[0]})} type="file" id="Image1" hidden />
          </label>
          <label htmlFor="Image2">
            <img className='w-20' src={!productData.Image2 ? assets.upload_area : URL.createObjectURL(productData.Image2)} alt="" />
            <input onChange={(e)=>setProductData({...productData, Image2: e.target.files[0]})} type="file" id="Image2" hidden />
          </label>
          <label htmlFor="Image3">
            <img className='w-20' src={!productData.Image3 ? assets.upload_area : URL.createObjectURL(productData.Image3)} alt="" />
            <input onChange={(e)=>setProductData({...productData, Image3: e.target.files[0]})} type="file" id="Image3" hidden />
          </label>
          <label htmlFor="Image4">
            <img className='w-20' src={!productData.Image4 ? assets.upload_area : URL.createObjectURL(productData.Image4)} alt="" />
            <input onChange={(e)=>setProductData({...productData, Image4: e.target.files[0]})} type="file" id="Image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Name</p>
        <input onChange={(e)=>setProductData({...productData, name: e.target.value})} value={productData.name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Description</p>
        <textarea onChange={(e)=>setProductData({...productData, description: e.target.value})} value={productData.description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Description Here' required />
      </div>

      <div className='flex flex-col w-full sm:flex-row gap-3 sm:gap-8'>
        <div>
          <p className='mb-2'>Category</p>
          <select className='w-full px-3 py-2' onChange={(e)=>setProductData({...productData, category: e.target.value})} value={productData.category}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select className='w-full px-3 py-2' onChange={(e)=>setProductData({...productData, subCategory: e.target.value})} value={productData.subCategory}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input type="number" onChange={(e)=>setProductData({...productData, price: e.target.value})} value={productData.price}  className='w-full not-first:px-3 py-2 sm:w-[120px]' placeholder='Price' required />
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-2'>
          <div onClick={()=>productData.sizes.includes('S') ? setProductData({...productData, sizes: [...productData.sizes.filter(item => item !== 'S')]}) : setProductData({...productData, sizes: [...productData.sizes, 'S']})} value={productData.subCategory}>
            <p className={`${productData.sizes.includes('S') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={()=>productData.sizes.includes('M') ? setProductData({...productData, sizes: [...productData.sizes.filter(item => item !== 'M')]}) : setProductData({...productData, sizes: [...productData.sizes, 'M']})}>
            <p className={`${productData.sizes.includes('M') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>productData.sizes.includes('L') ? setProductData({...productData, sizes: [...productData.sizes.filter(item => item !== 'L')]}) : setProductData({...productData, sizes: [...productData.sizes, 'L']})}>
            <p className={`${productData.sizes.includes('L') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>productData.sizes.includes('XL') ? setProductData({...productData, sizes: [...productData.sizes.filter(item => item !== 'XL')]}) : setProductData({...productData, sizes: [...productData.sizes, 'XL']})}>
            <p className={`${productData.sizes.includes('XL') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>productData.sizes.includes('XXL') ? setProductData({...productData, sizes: [...productData.sizes.filter(item => item !== 'XXL')]}) : setProductData({...productData, sizes: [...productData.sizes, 'XXL']})}>
            <p className={`${productData.sizes.includes('XXL') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2'>
        <input onChange={()=>setProductData({...productData, bestSeller: !productData.bestSeller})} checked={productData.bestSeller} type="checkbox" id="BestSeller" />
        <p className='font-medium'>Add to bestseller</p>
      </div>

      <button type="submit" value="Add To Cart" className='bg-black text-white w-28 py-3 mt-3 rounded-0 border-none cursor-pointer'>ADD</button>
    </form>
  )
}

export default Add