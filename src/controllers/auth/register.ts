import { NextFunction, Request, Response } from "express";
import bcypt from "bcryptjs";
// modal
import UserModal from "@/models/user";
// util
import createResponse from "@/util/createResponse";
import ErrorHandle from "@/util/ErrorHandle";
import { getToken } from "@/util/JwtToken";

const register = async (req: Request, res: Response, _: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    // 檢查信箱是否重複
    const count: number = await UserModal.countDocuments({ email });

    if (count > 0) {
      return createResponse(res, 403, "使用者信箱重複");
    }

    const newPassword = await bcypt.hash(password, 12);
    const newUser = await UserModal.create({
      username,
      email,
      password: newPassword,
    });

    const token = getToken(newUser);
    createResponse(res, 200, "新建使用者成功", { userInfo: newUser, token });
  } catch (error) {
    const msg = ErrorHandle(res, error);
    createResponse(res, 403, msg, "新建使用者失敗");
  }
};

export default register;
