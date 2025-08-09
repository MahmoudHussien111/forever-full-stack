import React, { useContext, useEffect } from 'react'
import {ShopContext} from "../context/ShopContext";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Verfiy = () => {
    const {token, setCartItems, backend, navigate} = useContext(ShopContext);
    const [seachParams, setSearchParams] = useSearchParams();

    const success = seachParams.get('success');
    const orderId = seachParams.get('orderId');

    const verifystripe = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backend + '/api/order/verifyStripe', {success, orderId}, {headers:{token}});

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                navigate('/cart');
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    };

    useEffect(() => {
        verifystripe()
    }, [token])
  return (
    <div></div>
  )
}

export default Verfiy