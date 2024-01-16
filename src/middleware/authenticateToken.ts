import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken' ;



export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.cookies.authToken ;
    const refreshToken = req.cookies.refreshToken ;
    if(!authToken || !refreshToken){
        return res.status(401).json({message : " Authentication Failed : No authToken or refreshToken is provided "})
    }

    jwt.verify(authToken,process.env.JWT_SECRET_KEY||"",(err:any,decode:any)=>{
        
        if(err) {
            jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY||"",(refreshErr:any,refreshDecode:any)=> {
                if(refreshErr){
                    return res.status(401).json({message : " Authentication Failed : Both tokens are invalid"}) ;
                }
                else{
                    const newAuthToken = jwt.sign({userId : refreshDecode.userId},process.env.JWT_SECRET_KEY||"",{expiresIn : '30m'});
                    const newRefreshToken = jwt.sign({userId : refreshDecode.userId},process.env.JWT_REFRESH_SECRET_KEY||"",{expiresIn : '2h'})

                    res.cookie('authToken',newAuthToken,{httpOnly:true}) ;
                    res.cookie('refreshToken',newRefreshToken,{httpOnly : true }) ;
                    console.log(refreshDecode.userId,"liasd")
                 
                    req.userId = refreshDecode.userId ;
                    next() ;
                }
            })
        }
        else{
            req.userId = decode.userId ;
            next();
   }
})
};

export const ownership = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
  
      const authToken = req.cookies.authToken;
  
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY || '') as {userId:string};
      const userId = decodedToken.userId;
  
  
      if (!userId) {
        return res.status(400).json({message:"Invalid token"});
      }
  
      if (userId !== id) {
        return res.status(403).json({message:"You are not authorized to deleted other users"});
      }
  
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
  }
};