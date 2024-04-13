import { NextFunction, Request, Response } from "express";
// modal
import WorkspaceModal from "@/models/workspace";

// util
import createResponse from "@/util/createResponse";
import kanbanModal from "@/models/kanban";

type Iquery = Pick<IMember, "userId">;

const getKanbans = async (req: Request, res: Response, _: NextFunction) => {
  const { userId } = req.query as Iquery;
  // 找到所有 userIds 包含自己的 workspace
  const workspaces = await WorkspaceModal.find({ userIds: { $in: userId } });

  if (!workspaces) {
    return createResponse(res, 200, "don't have workspace", []);
  }

  // 整理出 workspace 下所有 kanban 的 id 陣列
  const kanbanIds = workspaces.reduce((idArray, workspace) => {
    return idArray.concat(workspace.kanbanIds);
  }, [] as string[]);

  if (!kanbanIds || kanbanIds.length === 0) {
    return createResponse(res, 200, "don't have kanban", []);
  }
  // 透過 workspaces.kanbanIds 找到 kanbans
  const kanbans = await kanbanModal.find({ _id: { $in: kanbanIds } });

  return createResponse(res, 200, "get kanbans success", kanbans);
};

export default getKanbans;
