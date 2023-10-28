import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
// modal
import UserModal from "@/models/user";
// util
import { getToken } from "@/util/JwtToken";
import createResponse from "@/util/createResponse";

const login = async (req: Request, res: Response, _: NextFunction) => {
  const { email = "", password = "" } = req.body;

  const user = await UserModal.findOne({ email }).select("+password").exec();

  // 查無使用者
  if (!user) {
    return createResponse(res, 403, "account not found", { email, password });
  }

  // 驗證密碼
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return createResponse(res, 403, "Invalid username or password.", {
      email,
      password,
    });
  }
  // 每次登入都更新 token
  const token = getToken(user);

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return createResponse(res, 200, "login success", { userInfo: user, token });
};

export default login;
