import { NextFunction, Request, Response } from "express";

const verifyToken = async (req: Request, _: Response, next: NextFunction) => {
  console.log("Middleware => verifyToken");
  return next();
};

export default verifyToken;
