import express from 'express'
import cors from 'cors'
import { mongoconnect } from './config/db.js'

//dotenv config
import dotenv from 'dotenv';
dotenv.config();

import foodroute from './routes/foodroute.js'
import userroute from './routes/userroute.js'
import cartroute from './routes/cartroute.js'
import orderroute from './routes/orderroute.js'


//config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//mongodb connection
mongoconnect();

//food routing
app.use('/api/food', foodroute)

//user routing
app.use('/api/user', userroute)

//cart routing
app.use('/api/cart', cartroute);

//order routing
app.use('/api/order', orderroute)


//allow to access the upload folder
app.use('/images', express.static("uploads"))

app.get('/', (req, res) => {
    res.send("hi its working")
})



//listen port
app.listen(port, () => {
    console.log(`port is running on ${port}`)
})