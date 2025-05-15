import React, { useContext, useEffect, useState } from 'react'
import './Form.css'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../Context/Appcontext'
import axios from 'axios'

import {toast} from 'react-toastify';
const Form = ({ setShow }) => {
    const [current, setCurrent] = useState("Sign Up")

    const { url, setToken } = useContext(Appcontext);
    //data store
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    //key and value pair data get in input field
    const onchangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }))
    }

    //check the store data

    // useEffect(()=>{
    //     console.log(data)
    // },[data])



    //axios to send to backend
    const submit = async (e) => {
        e.preventDefault();
        let newurl = url;
        if (current === "Login") {
            newurl += '/api/user/login'
        }
        else {
            newurl += '/api/user/register'
        }
        const response = await axios.post(newurl, data)

        if (response.data.success) {
            setToken(response.data.newtoken)
            localStorage.setItem("token", response.data.newtoken)
            setShow(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='form'>
            <form onSubmit={submit}>
                <div className="box">

                    <div className="title">
                        <h2>{current}</h2>
                        <img src={assets.cross_icon} alt="" onClick={() => setShow(false)} />
                    </div>

                    <div className="inputs">

                        {current === "Login" ? <></> : <input type="text" placeholder='Your name' required
                            name='name'
                            onChange={onchangehandler} value={data.name}

                        />}
                        <input type="email" placeholder='Your email' required name='email'
                            onChange={onchangehandler} value={data.email} />
                        <input type="password" placeholder='Your password' required name='password'
                            onChange={onchangehandler} value={data.password} />

                    </div>

                    <button className='submit' type='submit'>{current === "Sign Up" ? "Create account" : "Login"}</button>

                    <div className="conditions">
                        <input type="checkbox" required />
                        <p>By continuing,i agree to the terms of use & privacy policy.</p>
                    </div>

                    {current === "Login" ? <p className='last'>Create a new account? <span onClick={() => setCurrent("Sign Up")}>Click here</span></p> :
                        <p className='last'>Already have an account? <span onClick={() => setCurrent("Login")}>Login here</span></p>
                    }



                </div>

            </form>
        </div>
    )
}

export default Form
