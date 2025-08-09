import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from "./ProductItem"

const RelatedProducts = ({category, subcategory}) => {
    const {products} = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const fetchRelatdProducts = async () => {
        if (products.length > 0) {
            let productCopy = products.slice();

            if (category && subcategory) {
                productCopy = productCopy.filter((item) => item.category === category);
                productCopy = productCopy.filter((item) => item.subCategory === subcategory);
            }

            

            setRelatedProducts(productCopy)
        }
    }

    useEffect(() => {
        fetchRelatdProducts();
    }, [category, subcategory])
  return (
    <div className='my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
            relatedProducts.slice(0,5).map((item, i) => (
                <ProductItem key={i} name={item.name} id={item._id} price={item.price} image={item.images} />
            ))
        }
    </div>
  )
}

export default RelatedProducts