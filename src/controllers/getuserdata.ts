    import express, { Express, Request, Response , Application, NextFunction} from 'express';
    import  { RequestHandler } from 'express';
    import Jwt from "jsonwebtoken";
    import { compareSync } from "bcrypt-ts";
    import User from '../model/schema';

    export const getuserdata:RequestHandler = async(req:Request, res, next) => {
        try{
            //user id
            const id = req.userId;
            //find user's info not including password
        const user = await User.findById(id).select('-password');
        //send user's information
        res.status(200).json({user});
        } catch(err:any){
            return res.status(500).json({message : err.message})
                }
        
    };