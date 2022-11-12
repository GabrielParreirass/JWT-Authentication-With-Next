import {serialize} from 'cookie'


export default function async(req:any, res:any){
    const {cookies} = req;

    const jwt = cookies.OurSideJWT

    if(!jwt){
        res.json({message:'You are already logged out!'})
    }else{
        const serialized = serialize('OurSideJWT', '', {
            httpOnly: true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:-1,
            path:'/'
        })

        res.setHeader("Set-Cookie", serialized)
        res.status(200).json({message: 'You`ve been successfull loged out!'})
    }
}