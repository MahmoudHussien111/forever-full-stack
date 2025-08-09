import React, { useState } from 'react'
import axios from "axios"
import {backend} from "../App"
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
    const [formData, setFormData] = useState({email: "mahmoudhss500@gmail.com", password: "mahmoudhss500!"});
    const adminAuthentication = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backend + '/api/user/admin', {email: formData.email, password: formData.password});
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }
  return (
    <div className='flex items-center justify-center h-screen w-full'>
        <div className='bg-white rounded-lg shadow-md max-w-md px-8 py-6'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={adminAuthentication}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Adress</p>
                    <input value={formData.email}onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='example@email.com' className="rounded-md w-full outline-none px-3 py-2 border border-gray-300" type="email" required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Adress</p>
                    <input value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} placeholder='Enter Your Password' className="rounded-md w-full outline-none px-4 py-2 border border-gray-300" type="password" required />
                </div>
                <button className='bg-black text-white px-4 py-2 w-full rounded-md mt-2 cursor-pointer' type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login