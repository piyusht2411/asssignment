import express, { Router, Express, Request, Response, Application } from 'express';
import { RequestHandler } from 'express';
import { genSaltSync, hashSync } from "bcrypt";
import User from '../model/schema';
export const updateUser: RequestHandler = async(req:Request, res, next) => {
  try {
    const { fname, lname, email, phone, gender, password } = req.body;
    //validation
    // if (email && !email.includes('@')) {
    //   return res.status(400).json({
    //     message: "Please enter a valid email"
    //   })
    // }
    // if ((phone && phone.toString().length) != 10) {
    //   return res.status(400).json({
    //     message: "Please enter a valid phone number"
    //   })


    // }
    // if ((password && password.length) < 8) {
    //   return res.status(400).json({
    //     message: "Password length should be greater than 8 characters"
    //   })

    // }

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const pass:RegExp=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    

    // check input for correctness
    if (password && !pass.test(password.toString())) {
      return res.status(407).json({ message: 'Enter valid password with uppercase, lowercase, number & @' });
    }
    if (email && !expression.test(email.toString())) {
      return res.status(407).json({ message: 'Enter valid email' });
    }
    if(phone && typeof phone !== 'number' && (""+phone).length !== 10 ) {
      return res.status(407).json({ message: 'Phone number should only have 10 digits, No character allowed.' });
    }
    
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    //find user by id and update its info 
    const upadtedata = await User.findByIdAndUpdate(
      req.params.id,
      {
        fname,
        lname,
        email,
        phone,
        password:hashPassword,
        gender
      },
      { new: true }
    )
    //if data is not found
    if (!upadtedata) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User's data is sucessully updated", upadtedata });

  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }

};