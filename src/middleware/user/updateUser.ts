import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
// util
import createResponse from "@/util/createResponse";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { _id, username = "" } = req.body;

  if (!Types.ObjectId.isValid(_id)) {
    return createResponse(res, 404, "使用者ID格式錯誤");
  }

  if (username.length === 0) {
    return createResponse(res, 404, "請傳送使用者名稱");
  }

  return next();
};

export default updateUser;
