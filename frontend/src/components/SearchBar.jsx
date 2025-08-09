import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext"
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const location = useLocation();
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])
  return showSearch && visible ? (
    <div className='text-center border-t border-b border-gray-100 bg-gray-50'>
        <div className='inline-flex justify-center items-center border border-gray-400 bg-inherit px-5 py-2 my-4 mx-3 rounded-full w-2/3 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 bg-inherit outline-none text-sm' type="text" placeholder='Search' />
            <img className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={()=>setShowSearch(false)} alt="" />
    </div>
  ) : null
}

export default SearchBar