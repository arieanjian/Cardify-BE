import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
// modal
import kanbanModal from "@/models/kanban";
import WorkspaceModal from "@/models/workspace";
// util
import createResponse from "@/util/createResponse";

interface INewKanban {
  name: string;
  workspaceId: string;
}

const addKanban = async (req: Request, res: Response, _: NextFunction) => {
  try {
    // 前端傳來準備用來建立使用者的資料(middleware會把資料整理乾淨)
    const data: INewKanban = req.body;
    const { name, workspaceId } = data;

    if (!workspaceId || workspaceId.length === 0) {
      return createResponse(res, 500, "workspaceId is null");
    }

    const newKanban: IKanban = await kanbanModal.create({
      name,
      workspaceId: new mongoose.Types.ObjectId(workspaceId),
    });

    // 將 kanbanId ID 寫進 workspace
    const updateWorkspace: IWorkspace | null =
      await WorkspaceModal.findByIdAndUpdate(
        workspaceId,
        { $push: { kanbanIds: newKanban._id } },
        { new: true } // 返回更新後的資料
      ).populate("kanbanIds", "name isPinned");

    if (!updateWorkspace) {
      return createResponse(res, 404, "查無workspace");
    }

    return createResponse(res, 200, "新建kanban成功", updateWorkspace);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤", error);
  }
};

export default addKanban;
