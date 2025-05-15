import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    name:{
        type:String,required:true
    },
    email:{
        type:String,required:true,unique:true
    },
    password:{
        type:String,required:true
    },
    cartitems:{
        type:Object,default:{}
    }
},{minimize:false})

const usermodel =mongoose.models.users ||  mongoose.model("users",userschema);

export default usermodel;