import React, { useContext, useEffect } from 'react'

import './Verify.css'

import { useNavigate, useSearchParams} from 'react-router-dom'
import { Appcontext } from '../../Context/Appcontext'
import axios from 'axios'

const Verify = () => {

     const [serachparams,setSearchparams] = useSearchParams()
     const success = serachparams.get("success")
     const orderId = serachparams.get("orderId")

    //  console.log(success,orderId)

    const {url} = useContext(Appcontext)

    const navigate = useNavigate()
 
    const verify = async()=>{
        const response = await axios.post(url+'/api/order/verify',{success,orderId})

        if(response.data.success)
        {
            navigate('/myorders')
        }
        else
        {
            navigate('/')
        }
    }

    useEffect(()=>{
       verify()
    },[])





  return (
    <div className='verify'>
       <div className="spinner"></div>
    </div>
  )
}

export default Verify
