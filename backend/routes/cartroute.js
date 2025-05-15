import {addcart,removecart,getcart} from '../controllers/cartcontroller.js'

import express from 'express'
import authentication from '../middleware/auth.js';

const cartroute = express.Router();


cartroute.post('/addcart' ,authentication ,addcart)

cartroute.post('/removecart',authentication ,removecart)

cartroute.post('/getcart' ,authentication ,getcart)


export default cartroute;