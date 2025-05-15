import React, { useContext, useEffect, useState } from 'react'

import './Myorder.css'

import { Appcontext } from '../../Context/Appcontext'
import axios from 'axios'

import { assets } from '../../assets/assets'
import {toast} from 'react-toastify'

const Myorder = () => {

    const { url, token } = useContext(Appcontext)

    //store the order data
    const [data, setData] = useState([]);

    const fetchorder = async () => {
        let response = await axios.post(url + '/api/order/myorders', {}, { headers: { token } })
        if(response.data.success)
        {
            setData(response.data.data)
            toast.success(response.data.message)

        }
        
    }


    useEffect(() => {
        if (token) {
            fetchorder();
        }
    }, [token])
    return (
        <div className='myorder'>

            <h2>My Orders</h2>

            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div className="my-order" key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items.map((item, index) => {

                                    if (index === order.items.length - 1) {
                                        return item.name + "x" + item.quantity
                                    }
                                    else {
                                        return item.name + "x" + item.quantity + ","
                                    }

                                })}
                            </p>

                            <p>${order.amount}.00</p>

                            <p>Items: {order.items.length}</p>

                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>

                            <button onClick={fetchorder}>Track Order</button>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Myorder
