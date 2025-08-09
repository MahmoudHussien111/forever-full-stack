import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const {backend, token, curency} = useContext(ShopContext);

  const [orders, setOrders] = useState([])

  const loadOrdersData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backend + '/api/order/userorders',{},{headers:{token}});
      if (response.data.success) {
        let orderItems = [];
        response.data.orders.map(order => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            orderItems.push(item)
          })
        })
        setOrders(orderItems.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrdersData()
  }, [token])
  return (
    <div className='border-t border-gray-100 pt-16'>
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {
          orders.map((item, i) => (
            <div key={i} className='border-t border-b border-gray-200 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start gap-6 text-sm">
                <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
                <div>
                  <p className='sm:text-[17px] font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-[17px] text-gray-700">
                    <p>{curency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <div className='mt-1'>Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></div>
                  <p className='mt-1'>Payment Method: {item.paymentMethod}</p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className='flex items-center gap-2 px-3 py-2 border border-gray-200'>
                  <div className="min-w-2 h-2 rounded-full bg-green-400"></div>
                  <p className='sm:text-sm font-medium'>{item.status}</p>
                </div>
                <button onClick={loadOrdersData} className='border border-gray-200 px-4 py-2 text-sm font-medium rounded-sm'>Track your order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders