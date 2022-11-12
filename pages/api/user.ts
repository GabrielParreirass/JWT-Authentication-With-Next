export default function async (req:any, res:any) {
    const cookies = req.cookies

    const jwt = cookies.OurSideJWT

    if(!jwt){
        return res.json({message:'Invalid Token!'})
    }

    console.log(jwt)

    res.json({message:'You are allowed, valid token!'})
}