import { RequestHandler } from 'express';
  export const logout:RequestHandler = (req, res, next) => {
    try{
        res.clearCookie('authToken') ;
        res.clearCookie('refreshToken');
        return res.status(200).json({ok:true,message:"User has been logged out"}) ;
    }
    catch(err){
        next(err) ;
    }
};