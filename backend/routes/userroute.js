import express from 'express'

import { register,login } from '../controllers/usercontroller.js';

const userroute = express.Router()


userroute.post("/register",register)

userroute.post('/login',login)



export default userroute