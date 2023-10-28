import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
// modal
import memberModal from "@/models/member";
// util
import createResponse from "@/util/createResponse";

type Iquery = {
  workspaceId: string;
};

const getMembers = async (req: Request, res: Response, _: NextFunction) => {
  const { workspaceId = "" } = req.body as Iquery;

  if (workspaceId.length === 0) {
    return createResponse(res, 400, "請輸入 workspaceId", null);
  }

  const members = await memberModal.aggregate([
    { $match: { workspaceId: new mongoose.Types.ObjectId(workspaceId) } },
    {
      $lookup: {
        from: "users", // 注意這裡應該是你的User collection的名稱，通常是模型名稱的小寫和複數形式
        localField: "userId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" }, // $unwind 用於將 userInfo 從 Array 轉為 object
    {
      $addFields: {
        userInfo: "$userInfo", // 在這裡添加 userInfo 欄位
      },
    },
    {
      $project: {
        lastActiveTime: 0,
        createdAt: 0,
        updatedAt: 0,
        "userInfo.password": 0,
        "userInfo.lastActiveTime": 0,
        "userInfo.createdAt": 0,
        "userInfo.updatedAt": 0,
      },
    },
  ]);

  return createResponse(res, 200, "取得 member 成功", members);
};

export default getMembers;
