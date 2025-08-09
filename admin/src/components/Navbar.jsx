import React from 'react'
import {assets} from "../assets/assets"
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] py-2'>
      <img className='w-32' src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className='bg-gray-900 text-white px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar