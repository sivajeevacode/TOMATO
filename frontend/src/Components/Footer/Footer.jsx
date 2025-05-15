import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='contact'>
      <div className="footer-content">
        <div className="left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eum quasi ut accusantium facilis assumenda atque molestias maxime similique aspernatur?</p>

          <div className="social">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="center">
          <h2>COMPANY</h2>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>

        </div>

        <div className="right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+9876543210</li>
            <li>sivajeeva459@gmail.com</li>
          </ul>
        </div>
      </div>


      <hr />
      <p className='copy'>Copyright 2025 &copy; Made by SIVA- All Right Reserved.</p>
    </div>
  )
}

export default Footer
