import express, { Router, Express, Request, Response, Application } from 'express';
import { RequestHandler } from 'express';
import User from '../model/schema';
export const deleteUser: RequestHandler = async (req: Request, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        // console.log(user);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(404).json({ message: "user deleted" });


    } catch (err: any) {
    return res.status(500).json({ message: err.message })
}
    
};