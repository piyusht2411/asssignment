import express, { Express, Request, Response , Application, NextFunction} from 'express';
import  { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import nodemailer from "nodemailer";
import User from '../model/schema';
  export const login:RequestHandler = async(req, res, next) => {
    // try{
    //     const {email, password} = req.body;

    //     const existinguser = await User.findOne({email});

    //     //if user is not found
    //     if(!existinguser){
    //         return res.status(407).json({ message: 'User not Exist' });
    //     }
    //     const isMatch = compareSync(password, existinguser.password);
    //     //if password doens't match
    //     if(!isMatch){
    //         return res.status(407).json({ message: 'Password not match' });
    //     }
    //     const id = existinguser._id;
    //     let refreshToken = "", AccessToken = "";

    //     refreshToken = await Jwt.sign({id}, process.env.JWT_SECRET_KEY!, {
    //         expiresIn: "2h"
    //     });
    //     AccessToken = await Jwt.sign({id}, process.env.JWT_SECRET_ACCESS!,{
    //         expiresIn: "30m",
    //     });
        
    //     res.cookie('AccessToken',AccessToken,({httpOnly : true})) ;
    //     res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
    //     res.status(201).json({
    //         refreshToken,
    //         AccessToken,
    //         message: 'User logged in successfully'
    //     });
        

    
    // }
    // catch(err){
    //     res.status(407).json({message: err});

    // }

    try{
        const {email,password} = req.body ;

        const user = await User.findOne({email}) ;

        // Checking if the email exists in database 
        if(!user){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}) ;
        }

        // comapring password entered with database hashed Password
        const isPasswordMatch = await compareSync(password,user.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }

        // Generating tokens
        const authToken = jwt.sign({userId : user.id},process.env.JWT_SECRET_KEY||" ",{expiresIn : '30m'}) ;
        const refreshToken = jwt.sign({userId : user.id},process.env.JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '2h'}) ;

        // Saving tokens in cookies 
        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;

        return res.status(200).json({ok:true,message : "Login Successful",userid:user.id}) ;

    }
    catch(err){
        next(err) ;
    }
    
};

export const sendMail:RequestHandler = async(req, res, next) => {

    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure:false,
        auth: {
            user: 'name.kovacek74@ethereal.email',
            pass: '3GdZ3g8VSex2uA2UP4'
        }
    });

    
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Piyush" <piyush@thakur.com>', // sender address
          to: "piyush@gmail.com", // list of receivers
          subject: "Hello ", // Subject line
          text: "Hello bro", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
        res.send('message send');
    
    

};