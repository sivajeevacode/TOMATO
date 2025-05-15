import React from 'react'
import './Order.css'
import { useEffect, useState } from 'react';

import axios from 'axios'

import { assets } from '../../assets/assets'

import { toast } from 'react-toastify'

const Order = () => {

  const url = 'http://localhost:4000';

  const [order, setOrder] = useState([]);


  const fetchorder = async () => {
    const response = await axios.get(url + "/api/order/orders")
    if (response.data.success) {
      setOrder(response.data.data)
    }
    else {
      toast.error("error")
    }
  }

  useEffect(() => {
    fetchorder();
  }, [])


  const statusupdate = async(event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })

    if(response.data.success)
    {
      await fetchorder();
    }
  }


  return (
    <div className='order'>

      <h3>Order Page</h3>


      <div className='container'>
        {order.map((orders, index) => {
          return (
            <div className="orders" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
              <p className='food'>
                {orders.items.map((item, index) => {
                  if (index === orders.items.length - 1) {
                    return item.name + "x" + item.quantity
                  }
                  else {
                    return item.name + "x" + item.quantity + ","
                  }
                })}
              </p>

              <p className='name'>{orders.address.firstname+" "+orders.address.lastname}</p>


             <div className='address'>

              <p>{orders.address.street+','}</p>
              <p>{orders.address.city+","+orders.address.state+","+orders.address.country+","+orders.address.zipcode}</p>

             </div>

             <p className='phone'>
              {orders.address.phone}
             </p>

             </div>

             <p>Items: {orders.items.length}</p>
  
             <p>${orders.amount}.00</p>

             <select value={orders.status} onChange={(event)=>statusupdate(event,orders._id)}>

              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>

             </select>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default Order
