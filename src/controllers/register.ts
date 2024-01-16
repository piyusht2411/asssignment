import { RequestHandler } from 'express';
import { genSaltSync, hashSync } from "bcrypt";
import User from '../model/schema';
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { fname, lname, email, phone, password, gender } = req.body;
    //validaton
    // if (!email || !email.includes('@')) {
    //   return res.status(400).json({
    //     message: "Please enter a valid email"
    //   })
    // }
    // if ((phone.toString().length) != 10) {
    //   return res.status(400).json({
    //     message: "Please enter a valid phone number"
    //   })


    // }
    // if ((password.length) < 8) {
    //   return res.status(400).json({
    //     message: "Password length should be greater than 8 characters"
    //   })

    // }

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const pass:RegExp=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    
        // check input for correctness
        if (!pass.test(password.toString())) {
          return res.status(407).json({ message: 'Enter valid password with uppercase, lowercase, number & @' });
        }
        if (!expression.test(email.toString())) {
          return res.status(407).json({ message: 'Enter valid email' });
        }
        if(typeof phone !== 'number' && (""+phone).length !== 10 ) {
          return res.status(407).json({ message: 'Phone number should only have 10 digits, No character allowed.' });
        }

    const existinguser = await User.findOne({ email });
//if user is already exist
    if (existinguser) {
      return res.status(407).json({ message: 'User already Exist' });
    }
    //hashing password
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    const newUser = new User({
      fname,
      lname,
      email,
      phone,
      password: hashPassword,
      gender

    });
    //save new user
    await newUser.save();
    res.status(200).json({ message: 'registred successfully' })

  } catch (err) {
    res.status(407).json({ message: err });

  }

};