import usermodel from "../models/usermodel.js";


//add cart logics
const addcart = async (req, res) => {

    try {
        const user = await usermodel.findById(req.body.userId)

        const cartitems = await user.cartitems;

        if (!cartitems[req.body.itemid]) {
            cartitems[req.body.itemid] = 1;
        }
        else {
            cartitems[req.body.itemid] += 1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId, { cartitems });

        res.json({ success: true, message: "Added To Cart" })

    } catch {
        res.json({ success: false, message: "error" })
    }


}


//removecart logics
const removecart = async (req, res) => {

    try {
        const user = await usermodel.findById(req.body.userId)
        const cartitems = await user.cartitems;

        if (cartitems[req.body.itemid] > 0) {
            cartitems[req.body.itemid] -= 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userId, { cartitems })

        res.json({ success: true, message: "Removed From Cart" })


    }
    catch {
        res.json({ success: false, message: "error" })
    }

}

//getcart logics
const getcart = async (req, res) => {

    try {
        const user = await usermodel.findById(req.body.userId)
        const cartitems = await user.cartitems;

        res.json({ success: true, cartitems })

    } catch {
        res.json({ success: false, message: "error" })
    }

}


export { addcart, removecart, getcart };