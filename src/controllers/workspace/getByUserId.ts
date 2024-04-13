import { NextFunction, Request, Response } from "express";
// modal
import WorkspaceModal from "@/models/workspace";
import memberModal from "@/models/member";
// util
import createResponse from "@/util/createResponse";

type Iquery = Pick<IMember, "userId">;

const getByUserId = async (req: Request, res: Response, _: NextFunction) => {
  const { userId } = req.query as Iquery;

  // 先去 member 找到所有 userId等於自己的 member
  const members = await memberModal.find({ userId: userId });

  if (!members) {
    return createResponse(res, 200, "don't have workspace", []);
  }
  // 透過 memberIds 找到 workspaces
  const memberIds: string[] = members.map((member) => member._id);

  // 找到包含任一成员ID的所有工作区
  const workspaces: IWorkspace[] = await WorkspaceModal.find({
    memberIds: { $in: memberIds },
  });
  // .populate({ path: "kanbanInfos", select: "name isPinned" });

  if (workspaces.length === 0) {
    return createResponse(res, 200, "查無workspace資料", workspaces);
  }

  return createResponse(res, 200, "取得workspaces成功", workspaces);
};

export default getByUserId;
