import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'

import {toast} from 'react-toastify';

const Add = () => {

  //for image
  let [image, setImage] = useState(false)

  //data store
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',  //price in this place is a string after i convert to number (remember)
    category: ''
  })



  //name:value data format taken for onchange the inputs and its store in data

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }))

  }


  //send the data to backend
  const onsubmit = async (event) => {
    event.preventDefault()
    const formdata = new FormData();
    formdata.append('name', data.name)
    formdata.append('description', data.description)
    formdata.append('price', Number(data.price))  //now convert to number to send backend
    formdata.append('category', data.category)
    formdata.append('image', image)

    const response = await axios.post('https://tomato-backend-q8yo.onrender.com/api/food/add', formdata)
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        category: '',
        price: ''
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else {
      console.log('data not send to backend')
      toast.error(response.data.message)
    }
  }


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmit}>

        <div className="upload-image flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input type="file" required hidden id='image' onChange={(e) => setImage(e.target.files[0])} />
        </div>


        <div className="name flex-col">
          <p>Product Name</p>
          <input type="text" placeholder='Type here' required name='name' onChange={onchangehandler} value={data.name} />
        </div>

        <div className="description flex-col">
          <p>Product description</p>
          <textarea name="description" id="description" rows='6' placeholder='Add description' onChange={onchangehandler} value={data.description}></textarea>
        </div>

        <div className="product-category-price">
          <div className="category flex-col">
            <p>Product Category</p>
            <select name='category' onChange={onchangehandler}>
              <option value=""></option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="price flex-col">
            <p>Product Price</p>
            <input type="Number" placeholder='$20' required name='price' onChange={onchangehandler} value={data.price} />
          </div>

        </div>

        <button className="add-btn" type='submit'>ADD</button>
      </form>
    </div>
  )
}

export default Add
