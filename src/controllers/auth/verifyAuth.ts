import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// modal
import UserModal from "@/models/user";
// util
import { getToken } from "@/util/JwtToken";
import createResponse from "@/util/createResponse";

const verifyAuth = async (req: Request, res: Response, _: NextFunction) => {
  // const { account = "", password = "" } = req.body;
  const bearerToken = req.headers.authorization;

  const token = await bearerToken?.split(" ")[1];

  if (!token || token === "undefined") {
    return createResponse(res, 401, "token not found", {});
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET!);
  const { _id } = decode as IDecodedToken;

  const user = await UserModal.findById(_id);
  if (!user) {
    return createResponse(res, 404, "user not found", {});
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // 每次進入系統都更新一次token
  const newToken = getToken(user);
  return createResponse(res, 200, "get user data success", {
    userInfo: user,
    token: newToken,
  });
};

export default verifyAuth;
