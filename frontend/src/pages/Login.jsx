import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from "axios";
import { toast } from 'react-toastify';
const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backend } = useContext(ShopContext);
  const [userData, setUserData] = useState({name: '', password: '', email: ''});

  const HandleLoginForm = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backend + '/api/user/register',{name: userData.name, email: userData.email, password: userData.password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backend + '/api/user/login',{email: userData.email, password: userData.password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);

        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  return (
    <form onSubmit={HandleLoginForm} className='flex flex-col items-center gap-4 mt-14 text-gray-800 w-[90%] sm:max-w-96 m-auto'>
      <div className='inline-flex gap-2 items-center mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e)=>setUserData({...userData, name: e.target.value})} value={userData.name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e)=>setUserData({...userData, email: e.target.value})} value={userData.email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e)=>setUserData({...userData, password: e.target.value})} value={userData.password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='flex justify-between text-sm mt-[-8px] w-full'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {
          currentState === 'Login' ? 
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Sign Up</p> : 
          <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Sign In</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login