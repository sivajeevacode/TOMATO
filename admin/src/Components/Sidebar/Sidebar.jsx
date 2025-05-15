import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="boxes">

        <NavLink  to='/add' className="box">
           <img src={assets.add_icon} alt="" />
           <p>Add Items</p>
        </NavLink>


        <NavLink  to='/list' className="box">
           <img src={assets.order_icon} alt="" />
           <p>List Items</p>
        </NavLink>

        <NavLink  to='/orders' className="box">
           <img src={assets.order_icon} alt="" />
           <p>Orders</p>
        </NavLink>

      </div>
      
    </div>
  )
}

export default Sidebar
