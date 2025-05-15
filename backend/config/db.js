import mongoose from 'mongoose'

export const mongoconnect = async () => {
    await mongoose.connect("mongodb+srv://sivajeeva459:siva123@cluster0.yxfdq.mongodb.net/food-del?")
        .then(() => console.log("mongodb connected"))
        .catch((error) => console.log("not mongodb connected", error))
}

