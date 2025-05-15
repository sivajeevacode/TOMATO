import { adminorders, myorders, placeorder, status, verify } from "../controllers/ordercontroller.js";
import express from 'express'
import authentication from "../middleware/auth.js";

const orderroute = express.Router();


orderroute.post('/place', authentication, placeorder)

orderroute.post('/verify', verify)

orderroute.post('/myorders', authentication, myorders)

orderroute.get('/orders', adminorders)

orderroute.post('/status', status)

export default orderroute;