//dotenv config
import dotenv from 'dotenv';
dotenv.config();

import usermodel from "../models/usermodel.js"
import ordermodel from "../models/ordermodel.js"

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//place order
const placeorder = async (req, res) => {

    const frontend_url = "http://localhost:5174"; //for stripe session

    try {

        const neworder = new ordermodel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await neworder.save();
        //after save the user, cartitems empty
        await usermodel.findByIdAndUpdate(req.body.userId, { cartitems: {} });


        //line_items for stripe session    (product details)
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        //In line items push delivery charges (delivery details)
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 5 * 100 * 80
            },
            quantity: 1
        })

        //create  stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`

        })

        //send session url to frontend

        res.json({ success: true, session_url: session.url })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}



//api for verify the payment
const verify = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success == "true") {
            await ordermodel.findByIdAndUpdate(orderId, { payment: true }) //payment success will be true
            res.json({ success: true, message: "payment success" })
        }
        else {
            await ordermodel.findByIdAndDelete(orderId)  //orderdata will be deleted
            res.json({ success: false, message: 'order cancelled' })
        }

    } catch (error) {
        console.log("error")
        res.json({ success: false, message: "error" })
    }
}


//api for my orders 
const myorders = async (req, res) => {

    try {
        const orders = await ordermodel.find({ userId: req.body.userId })

        res.json({ success: true, data: orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

//api for admin pannel orders show
const adminorders = async (req, res) => {
    try {

        const orders = await ordermodel.find({});
        res.json({ success: true, data: orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })

    }
}

//api for updating order status
const status = async (req, res) => {
    try {
        await ordermodel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "status updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

export { placeorder, verify, myorders, adminorders, status }