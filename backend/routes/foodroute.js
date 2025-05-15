import express from 'express'
import {add,list,remove} from '../controllers/foodcontroller.js'
import multer from 'multer'

const foodroute =  express.Router(); 

//create storage engine for store images
const storage  =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

foodroute.post('/add',upload.single("image"),add)

foodroute.get('/list',list)

foodroute.post('/remove',remove)


export default foodroute