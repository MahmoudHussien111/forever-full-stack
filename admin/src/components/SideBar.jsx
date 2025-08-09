import React from 'react'
import {NavLink} from "react-router-dom"
import { assets } from '../assets/assets'
const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border border-t-0 border-gray-300'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%]'>
            <NavLink className="flex gap-3 items-center border border-gray-200 border-r-0 px-4 py-2 rounded-l" to={'/add'}>
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <span className='hidden md:block'>Add Item</span>
            </NavLink>
            <NavLink className="flex gap-3 items-center border border-gray-200 border-r-0 px-4 py-2 rounded-l" to={'/list'}>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <span className='hidden md:block'>List Item</span>
            </NavLink>
            <NavLink className="flex gap-3 items-center border border-gray-200 border-r-0 px-4 py-2 rounded-l" to={'/orders'}>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <span className='hidden md:block'>Orders</span>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar