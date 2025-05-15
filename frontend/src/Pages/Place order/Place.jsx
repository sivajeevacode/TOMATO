import React, { useContext, useEffect, useState } from 'react'
import './Place.css'
import { Appcontext } from '../../Context/Appcontext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Place = () => {

  const { totalamount, token, cartitems, food_list, url } = useContext(Appcontext)

  const navigate = useNavigate();

  //store form data
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  //get key and pair value of data and set in data
  const changehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  //test the data stored
  // useEffect(()=>{
  //     console.log(data)
  // },[data])

  //place order
  const place = async (event) => {
    event.preventDefault();
    let orderitem = [];

    food_list.map((item) => {
      if (cartitems[item._id] > 0) {
        let iteminfo = item;

        iteminfo['quantity'] = cartitems[item._id];
        orderitem.push(iteminfo);

      }


    })

    let orderdata = {
      address: data,
      items: orderitem,
      amount: totalamount() + 5
    }

    let response = await axios.post(url+'/api/order/place', orderdata,{headers:{token}})

    if (response.data.success) {
      const { session_url } = response.data;

      window.location.replace(session_url);
    }
    else
    {
      console.log("error")
    }
  }

  useEffect(()=>{
        if(!token)
        {
          navigate('/cart')
        }
        else if(totalamount()===0)
        {
          navigate('/cart')
        }
  },[token])

  return (
    <form className='place' onSubmit={place}>
      <div className="left">
        <h2 className='title'>Delivery Information</h2>

        <div className="input-group">
          <input type="text" required placeholder='First name' name='firstname' onChange={changehandler} value={data.firstname} />
          <input type="text" required placeholder='Last name' name='lastname' onChange={changehandler} value={data.lastname} />
        </div>

        <input type="email" required placeholder='Email address' name='email' onChange={changehandler} value={data.email} />
        <input type="text" required placeholder='Street' name='street' onChange={changehandler} value={data.street} />

        <div className="input-group">
          <input type="text" required placeholder='City' name='city' onChange={changehandler} value={data.city} />
          <input type="text" required placeholder='State' name='state' onChange={changehandler} value={data.state} />
        </div>

        <div className="input-group">
          <input type="number" required placeholder='Zip code' name='zipcode' onChange={changehandler} value={data.zipcode} />
          <input type="text" required placeholder='Country' name='country' onChange={changehandler} value={data.country} />
        </div>

        <input type="number" required placeholder='Phone' name='phone' onChange={changehandler} value={data.phone} />

      </div>

      <div className="right">
        <h2>Cart Totals</h2>
        <div className='det'>
          <div className="pay">
            <p>Subtotal</p>
            <p>${totalamount()}</p>
          </div>
          <hr />

          <div className="pay">
            <p>Delivery Fee</p>
            <p>${totalamount() === 0 ? 0 : 5}</p>
          </div>
          <hr />

          <div className="pay">
            <p className='total'>Total</p>
            <p><b>${totalamount() === 0 ? 0 : totalamount() + 5}</b></p>
          </div>


        </div>

        <button type='submit'>PROCEED TO PAYMENT</button>
      </div>


    </form>

  )
}

export default Place