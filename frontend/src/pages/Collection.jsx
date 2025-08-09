import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"
import { assets } from '../assets/assets'

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterdProducts, setFilterdProducts] = useState([])
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const handleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  
  const handleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const FilterProducts = () => {
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterdProducts(productsCopy)
  }

  const sortProducts = () => {
    let fpCopy = filterdProducts.slice();

    switch(sortType) {
      case 'low-high':
        setFilterdProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterdProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default: 
        FilterProducts();
        break;
    }

  }

  useEffect(() => {
    FilterProducts()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300'>
        {/* Filter Option */}
        <div className="min-w-60">
          <p className='text-xl my-2 flex items-center cursor-pointer gap-2' onClick={()=>setShowFilter(!showFilter)}>FILTERS <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" /></p>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className='flex flex-col text-sm gap-2 font-light text-gray-700'>
              <p className="flex gap-2">
                <input type="checkbox" value="Men" className='w-3' onChange={handleCategory} /> Men
              </p>
              <p className="flex gap-2">
                <input type="checkbox" value="Women" className='w-3' onChange={handleCategory} /> Women
              </p>
              <p className="flex gap-2">
                <input type="checkbox" value="Kids" className='w-3' onChange={handleCategory} /> Kids
              </p>
            </div>
          </div>
          {/* Type Filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className='flex flex-col text-sm gap-2 font-light text-gray-700'>
              <p className="flex gap-2">
                <input type="checkbox" value="Topwear" className='w-3' onChange={handleSubCategory} /> Topwear


              </p>
              <p className="flex gap-2">
                <input type="checkbox" value="Bottomwear" className='w-3' onChange={handleSubCategory} /> Bottomwear
              </p>
              <p className="flex gap-2">
                <input type="checkbox" value="Winterwear" className='w-3' onChange={handleSubCategory} /> Winterwear
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex-1">

          <div className="flex justify-between text-[17px] sm:text-2xl mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div> 


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterdProducts.map((item, i) => (
                <ProductItem key={i} name={item.name} id={item._id} price={item.price} image={item.images} />
              ))
            }
          </div>

        </div>
    </div>
  )
}

export default Collection