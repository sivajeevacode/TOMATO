import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Appcontext } from '../../Context/Appcontext'

const Navbar = ({ setShow }) => {

 const navigate = useNavigate()
  const remove =()=>{
    localStorage.removeItem("token")
    setToken('')
    
    navigate('/')
  }


  const { totalamount, token,setToken } = useContext(Appcontext)
  const [active, setActive] = useState("home")

  return (
    <div className='navbar'>
      <Link to='/' ><img src={assets.logo} alt="" className='logo' /></Link>

      <ul className='links'>
        <a href='#home' onClick={() => setActive("home")} className={active === "home" ? "active" : ""}>Home</a>
        <a href='#menu' onClick={() => setActive("menu")} className={active === "menu" ? "active" : ""}>Menu</a>
        <a href='#mobile' onClick={() => setActive("mobile")} className={active === "mobile" ? "active" : ""}>Mobile app</a>
        <a href='#contact' onClick={() => setActive("contact")} className={active === "contact" ? "active" : ""}>Contact us</a>
      </ul>

      <div className="nav-right">
        <img src={assets.search_icon} alt="" className='search' />

        <div className="cart-icon">
          <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>

          <div className={totalamount() === 0 ? "" : "dot"}></div>

        </div>

        {
          !token ? <button onClick={() => setShow(true)}>Sign In</button> :

            <div className="profile-box">
              <img src={assets.profile_icon} alt="" className='profile' />

              <ul className='drop'>
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={remove}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>

        }
      </div>
    </div>
  )
}

export default Navbar