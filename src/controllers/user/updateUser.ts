import { NextFunction, Request, Response } from "express";
// modal
import UserModal from "@/models/user";
// util
import createResponse from "@/util/createResponse";

type IupdateUser = Pick<IUser, "_id" | "username">;

const updateUser = async (req: Request, res: Response, _: NextFunction) => {
  // 前端傳來要修改的使用者的資料
  const userInfo: IupdateUser = req.body;

  try {
    const user = await UserModal.findOneAndUpdate(
      { _id: userInfo._id },
      userInfo,
      { new: true }
    );
    if (!user) {
      return createResponse(res, 404, "使用者ID不存在");
    }
    // 回傳剛建立的使用者給前端
    return createResponse(res, 200, "修改使用者成功", user);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤");
  }
};

export default updateUser;
