import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Order from './Pages/Order/Order'



import { ToastContainer } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />

      <div className='admin'>
        <Sidebar />
       
        <Routes>
          <Route path='/add' element={<Add/>}  />
          <Route path='/list' element={<List/>}  />
          <Route path='/orders' element={<Order/>}  />
        </Routes>

      </div>

    </div>
  )
}

export default App
