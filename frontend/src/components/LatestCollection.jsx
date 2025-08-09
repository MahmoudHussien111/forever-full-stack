import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext";
import Title from "./Title"
import ProductItem from "./ProductItem"

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10))
    }, [products])
    
  return (
    <div className='my-10'>
        <div className='py-8 text-center text-3xl'>
            <Title text1="LATEST" text2="COLLECTIONS" />
            <p className='m-auto w-3/4 text-xs sm:text-sm md:text-[18px] text-gray-600'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
            </p>
        </div>

        {/* Collection Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                latestProducts.map((product, i) => (
                    <ProductItem key={i} id={product._id} name={product.name} image={product.images} price={product.price} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection