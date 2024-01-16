import { RequestHandler } from 'express';
  export const home:RequestHandler = (req, res, next) => {
    res.send('This is the home page');
};