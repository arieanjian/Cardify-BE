import { NextFunction, Request, Response } from "express";
// modal
import WorkspaceModal from "@/models/workspace";
import memberModal from "@/models/member";
// util
import createResponse from "@/util/createResponse";

const addMember = async (req: Request, res: Response, _: NextFunction) => {
  try {
    // 前端傳來準備用來建立使用者的資料(middleware會把資料整理乾淨)
    const Members_data: IMember[] = req.body;

    // 找出 workspaceId
    const workspaceId = Members_data[0].workspaceId;

    const workspace = await WorkspaceModal.findOne({ _id: workspaceId });

    if (!workspace) {
      return createResponse(res, 400, "查無workspace", null);
    }

    // 先取出舊的 memberIds
    const oldMembers = workspace.memberIds;

    // 建立 workspace 的 Members
    const Members = await memberModal.insertMany(Members_data);

    // 刪除舊的 member 資料
    await memberModal.deleteMany({
      _id: { $in: oldMembers },
    });

    const MemberIds = Members.map((member) => member._id);

    // 更新 workspace 的 memberIds
    await WorkspaceModal.updateOne(
      { _id: workspaceId },
      {
        $set: {
          memberIds: MemberIds,
        },
      }
    );

    // 回傳剛建立的使用者給前端
    return createResponse(res, 200, "新建Members成功", Members);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤");
  }
};

export default addMember;
