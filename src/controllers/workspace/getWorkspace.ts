import { NextFunction, Request, Response } from "express";
// modal
import WorkspaceModal from "@/models/workspace";
// util
import createResponse from "@/util/createResponse";

type Iquery = Pick<IWorkspace, "_id" | "name">;

const getWorkspace = async (req: Request, res: Response, _: NextFunction) => {
  const { _id = "", name = "" } = req.body as Iquery;

  let query = WorkspaceModal.find().populate("kanbans");
  if (name) {
    query = query.where("name").regex(new RegExp(name, "i"));
  }
  if (_id) {
    query = query.where("_id").equals(_id);
  }

  const workspaces: IWorkspace[] = await query.select("-createdAt -updatedAt");

  console.log("user collection 查詢筆數 => ", workspaces.length);

  return createResponse(res, 200, "取得workspaces成功", workspaces);
};

export default getWorkspace;
