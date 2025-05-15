import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Explore from '../../Components/Explore/Explore'
import Fooddisp from '../../Components/Fooddisp/Fooddisp'
import Download from '../../Components/Download/Download'
const Home = () => {
  const [category,setCategory] = useState("all");
  
  return (
    <div className='home'>
      <Header/>
      <Explore category={category} setCategory={setCategory} />
      <Fooddisp category={category}/>
      <Download/>
  
    </div>
  )
}

export default Home
