import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
     <div className="content">
      <h1>Order your <br /> favourite food here</h1>
      <p>Tomato is your go-to online platform for delicious meals, offering a wide variety of dishes from your favorite local restaurants.</p>

      <button><a href="#menu">View Menu</a></button>
     </div>
    </div>
  )
}

export default Header