import React, { useContext } from 'react'
import './Fooddisp.css'
import Fooditem from '../Fooditem/Fooditem'
import { Appcontext } from '../../Context/Appcontext'
const Fooddisp = ({ category }) => {

  const { food_list } = useContext(Appcontext)

  return (
    <div className='fooddisp'>
      <h1>Top dishes near you</h1>

      <div className="food-list">
        {food_list.map((item, index) => {
          if (category === 'all' || category === item.category)
            return <Fooditem key={index} name={item.name} id={item._id} des={item.description} price={item.price} image={item.image} />
        })}
      </div>
    </div>
  )
}

export default Fooddisp
