import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext";
import Title from "../components/Title"
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const {products, curency, cartItems, updateQuantity, navigate} = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }

      setCartData(tempData)
    }
  }, [cartItems, products])
  return (
    <div className='pt-14 border-t border-gray-100'>
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {
          cartData.map((item, i) => {
            const productData = products.find((product) => product._id === item.id);

            return (
              <div key={i} className='py-4 border-t border-gray-100 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.images[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <p className='flex items-center gap-4'>{curency}{productData.price}<span className='px-2 sm:px-3 py-1 bg-slate-50 border border-gray-100'>{item.size}</span></p>
                  </div>
                </div>
                <input onChange={(e)=> e.target.value === '' || e.target.value === '' ? null : updateQuantity(item.id,item.size,Number(e.target.value))} className='max-w-10 sm:max-w-20 py-1 px-3 border border-gray-300' type="number" min={1} value={item.quantity} />
                <img onClick={()=>{updateQuantity(item.id, item.size, 0)}} className='w-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white my-8 px-6 py-3 text-sm cursor-pointer'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart