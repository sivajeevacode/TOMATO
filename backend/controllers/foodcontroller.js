import foodmodel from '../models/foodmodel.js'
import fs from 'fs'


// add food item
const add = async (req, res) => {

    let image_name = `${req.file.filename}`;

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_name

    })
    try {
        await food.save();
        res.json({ success: true, message: "food added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }



}


//list food item
const list = async (req, res) => {

    try {
        const list = await foodmodel.find({})
        res.json({ success: true, data: list })
    } catch (error) {
        console.log(error)
        res.json({ success: flase, message: "error" })
    }



}



//remove food item
const remove = async (req, res) => {

    try {
        const food = await foodmodel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodmodel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'food removed' })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'error' })
    }


}

export { add, list, remove }