import React from 'react'
import './Explore.css'
import { menu_list } from '../../assets/assets'
const Explore = ({ category, setCategory }) => {
  return (
    <div className='explore' id='menu'>

      <div className="explore-content">
        <h1>Explore our menu</h1>
        <p>Choose from a diverse menu featuring a collectable array of dishes.Our mission to satisfy your cravings and elevate your dining experience,one dellicious meal at a time.</p>
      </div>

      <div className="foods">
        {menu_list.map((item, index) => {
          return (
            <div className='food' key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "all" : item.menu_name)} >
              <img src={item.menu_image} alt="" className={category === item.menu_name ? "active" : ""} />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>

      <hr />

    </div>
  )
}

export default Explore
