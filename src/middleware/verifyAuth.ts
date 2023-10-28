import { NextFunction, Request, Response } from "express";

const verifyAuth = async (req: Request, _: Response, next: NextFunction) => {
  console.log("Middleware => verifyAuth");
  // 驗證token是否過期，沒過期就更新token
  return next();
};

export default verifyAuth;
