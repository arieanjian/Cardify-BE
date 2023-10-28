import { NextFunction, Request, Response } from "express";
// modal
import UserModal from "@/models/user";
// util
import createResponse from "@/util/createResponse";

interface Iquery {
  id: string;
  username: string;
}

const getUser = async (req: Request, res: Response, _: NextFunction) => {
  const { id = "", username = "" } = req.query as unknown as Iquery;

  let query = UserModal.find();

  if (username) {
    query = query.where("username").regex(new RegExp(username, "i"));
  }
  if (id) {
    query = query.where("_id").equals(id);
  }
  const users: IUser[] = await query.select("-createdAt -updatedAt");

  console.log("user collection 查詢筆數 => ", users.length);

  const message = users.length === 0 ? "查無使用者" : "取得user成功";

  createResponse(res, 200, message, users);
};

export default getUser;
