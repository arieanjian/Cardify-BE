import { NextFunction, Request, Response } from "express";
// modal
import UserModal from "@/models/user";
// util
import createResponse from "@/util/createResponse";

type INewUser = Pick<IUser, "username" | "avatar" | "email" | "password">;

const addUser = async (req: Request, res: Response, _: NextFunction) => {
  // 前端傳來準備用來建立使用者的資料
  const newUserInfo: INewUser = req.body;

  try {
    // 檢查信箱是否重複
    const count: number = await UserModal.countDocuments({
      email: newUserInfo.email,
    });

    if (count > 0) {
      return createResponse(res, 409, "使用者信箱重複");
    }
    const newUser = await UserModal.create(newUserInfo);
    // 回傳剛建立的使用者給前端
    return createResponse(res, 200, "新建使用者成功", newUser);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤");
  }
};

export default addUser;
