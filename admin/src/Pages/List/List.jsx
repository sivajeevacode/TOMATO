import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
const List = () => {
   

  //list the all the food item
  const [list,setList] = useState([]);

  const foodlist = async()=>{
    const response = await axios.get('http://localhost:4000/api/food/list')
    // console.log(response.data)
    if(response.data.success)
    {
      setList(response.data.data)
    }
    else
    {
      toast.error("error")
    }
  }

  useEffect(()=>{
      foodlist();  //every time referesh calling the food list
  },[])

  //remove the food list
  const remove =  async(itemid)=>{
     const response = await axios.post('http://localhost:4000/api/food/remove',{id:itemid})

     if(response.data.success)
     {
       toast.success(response.data.message)
       foodlist();
     }
     else
     {
      toast.error("error")
     }
  }



  return (
    <div className='list'>

      <p className='head'>All Food List</p>

      <div className="food-list title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Actions</b>
      </div>

      {list.map((item,index)=>{
        return(
          <div className="food-list" key={index}>
               <img src={'http://localhost:4000/images/'+item.image} alt="" />
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>{item.price}</p>
               <p className='remove' onClick={()=>remove(item._id)}>x</p>
          </div>
        )
      })}


           
    </div>
  )
}

export default List
