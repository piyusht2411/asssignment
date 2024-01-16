import express, { Router, Express, Request, Response, Application } from 'express';
import { RequestHandler } from 'express';
import User from '../model/schema';
  export const getAllUsers:RequestHandler = async(req, res, next) => {
    try{
        //finding all user's info from database not including password
        const Alluser =await User.find().select('-password').exec();
        res.status(200).json({Alluser});

    }catch(err){
        res.status(407).json({message: err});
    }   

};