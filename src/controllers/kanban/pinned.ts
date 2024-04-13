import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
// modal
import kanbanModal from "@/models/kanban";
// util
import createResponse from "@/util/createResponse";

const Pinned = async (req: Request, res: Response, _: NextFunction) => {
  try {
    // 前端傳來準備用來建立使用者的資料(middleware會把資料整理乾淨)
    const data: IKanban = req.body;
    const { isPinned, _id } = data;

    if (!_id || _id.length === 0) {
      return createResponse(res, 500, "kanban is null");
    }

    const result = await kanbanModal.updateOne({ _id }, { isPinned });

    if (!result) {
      return createResponse(res, 404, "查無 kanban");
    }

    return createResponse(res, 200, "update kanban success", result);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤", error);
  }
};

export default Pinned;
