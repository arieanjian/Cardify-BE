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
  const users: IUser[] = await query.sort();

  console.log("user collection 查詢筆數 => ", users.length);

  createResponse(res, 200, "取得user成功", users);
};

export default getUser;
