import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { Appcontext } from '../../Context/Appcontext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const { cartitems, removecart, food_list ,totalamount,url} = useContext(Appcontext)

  const navigate = useNavigate()


  return (
    <div className='cart'>

      <div className="cart-top">
        <div className="cart-title title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {

          if (cartitems[item._id] > 0) {
            return (
              <div>
                <div className="cart-title list">
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>${item.price * cartitems[item._id]}</p>
                  <p onClick={() => removecart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )

          }

        })}
      </div>


      <div className="cart-bottom">

        <div className="left">
          <h2>Cart Totals</h2>

          <div className='det'>
            <div className="pay">
              <p>Subtotal</p>
              <p>${totalamount()}</p>
            </div>
            <hr />

            <div className="pay">
              <p>Delivery Fee</p>
              <p>${totalamount()===0?0:5}</p>
            </div>
            <hr />

            <div className="pay">
              <p className='total'>Total</p>
              <p><b>${totalamount()===0?0:totalamount()+5}</b></p>
            </div>


          </div>

          <button onClick={()=>navigate('/place')}>PROCEED TO CHECKOUT</button>
        </div>


        <div className="right">

          <p>If you have a promo code,Enter it here</p>

          <div className="input">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>

        </div>



      </div>

    </div>
  )
}

export default Cart