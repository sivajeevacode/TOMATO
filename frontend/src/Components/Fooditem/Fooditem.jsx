import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../Context/Appcontext'
const Fooditem = ({ name, des, price, image, id }) => {
  // const [count,setCount] = useState(0)

  const { addcart, removecart, cartitems ,url} = useContext(Appcontext);


  return (
    <div className='fooditem'>
      <div className="image">
        <img src={url+'/images/'+image} alt="" />
        {
          !cartitems[id] ?
            <img src={assets.add_icon_white} alt="" className='plus' onClick={() => addcart(id)} />
            : <div className="counter">
              <img src={assets.remove_icon_red} alt="" className='dec' onClick={() => removecart(id)} />
              <p>{cartitems[id]}</p>
              <img src={assets.add_icon_green} alt="" className='inc' onClick={() => addcart(id)} />
            </div>
        }
      </div>


      <div className="food-info">
        <div className="rating">
          <p className='food-name'>{name}</p>
          <img src={assets.rating_starts} alt="" className='star' />
        </div>
        <p className='des'>{des}</p>
        <p className="price">${price}</p>

      </div>
    </div>
  )
}

export default Fooditem
