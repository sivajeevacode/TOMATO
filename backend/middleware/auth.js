import jwt from 'jsonwebtoken'

const authentication = async(req,res,next)=>{
    const {token} = req.headers;

    if(!token)
    {
       return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try
    {

        const token_decode = jwt.verify(token,process.env.private_key)

        req.body.userId = token_decode.id;

        next()

    }catch(error)
    {
       console.log(error)
       res.json({success:false,message:"error"})
    }
}

export default authentication;