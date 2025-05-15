import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Place from './Pages/Place order/Place'
import Footer from './Components/Footer/Footer'
import Form from './Components/Form/Form'
import Verify from './Pages/Verify/Verify'
import Myorder from './Pages/Myorder/Myorder'

import { ToastContainer } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';
const App = () => {

  const [show, setShow] = useState(false)



  return (
    <>
      {show ? <Form setShow={setShow} /> : <></>}
      <div className='app' id='home'>
        <ToastContainer/>
        <Navbar setShow={setShow} />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place' element={<Place />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorder />} />

        </Routes>

      </div>

      <Footer />
    </>
  )
}

export default App
