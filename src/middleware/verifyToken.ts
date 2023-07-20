import { NextFunction, Request, Response } from "express";

const verifyToken = async (req: Request, _: Response, next: NextFunction) => {
  console.log("Middleware => verifyToken");
  // 驗證token是否過期，沒過期就更新token
  return next();
};

export default verifyToken;
