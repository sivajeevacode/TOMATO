import React from 'react'
import './Download.css'
import { assets } from '../../assets/assets'
const Download = () => {
  return (
    <div className='download' id='mobile'>
      <p>For Better Experience Download  <br /> Tomato App </p>

      <div className="plat">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>

    </div>
  )
}

export default Download
