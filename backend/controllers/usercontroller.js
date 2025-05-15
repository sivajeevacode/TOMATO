import usermodel from '../models/usermodel.js'

import jwt from 'jsonwebtoken'
import bycrpt from 'bcrypt'
import validator from 'validator'


const token = (id) => {
    return jwt.sign({ id }, process.env.private_key)
}

//register the user
const register = async (req, res) => {
    const { name, email, password } = req.body

    try {

        const exist = await usermodel.findOne({ email })
        if (exist) {
            res.json({ success: false, message: "Already have an account" })
        }

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bycrpt.genSalt(10)
        const hasedpassword = await bycrpt.hash(password, salt);

        const user = new usermodel({
            name: name,
            email: email,
            password: hasedpassword
        })

        const newuser = await user.save();

        const newtoken = token(newuser._id);

        res.json({ success: true, newtoken })

    }
    catch (error) {
        res.json({ success: false, message: "register error" })
    }
}



//login the user
const login = async (req, res) => {
      
     const {email,password} = req.body;

     try{
          const user = await usermodel.findOne({email})

          if(!user)
          {
            res.json({success:false,message:"User doesn't exist"})
          }

          const cred = await bycrpt.compare(password,user.password)

          if(!cred)
          {
            res.json({success:false,message:"Invalid Credentials"})
          }

          const newtoken = token(user._id)

          res.json({success:true,newtoken})

     }catch{
           res.json({success:false,message:"login error"})
     }


}



export { register, login };
