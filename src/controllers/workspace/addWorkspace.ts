import { NextFunction, Request, Response } from "express";
// modal
import workspaceModal from "@/models/workspace";
// util
import createResponse from "@/util/createResponse";
import memberModal from "@/models/member";

interface InewMember {
  role: IMember["role"];
  userInfo: IUser;
}

interface INewWorkspace {
  name: string;
  members: InewMember[];
}

const addWorkspace = async (req: Request, res: Response, _: NextFunction) => {
  try {
    // 前端傳來準備用來建立使用者的資料(middleware會把資料整理乾淨)
    const data: INewWorkspace = req.body;
    const { name, members } = data;

    // step1 建立 workspace
    const owner: InewMember | undefined = members.find(
      (member) => member.role === "Owner"
    );
    if (!owner) {
      return createResponse(res, 500, "members don't have owner");
    }

    const newWorkspac: IWorkspace = await workspaceModal.create({
      name: name,
      ownerId: owner.userInfo._id,
    });

    // step2 建立 Members (帶入workspaceId)
    const _member = members.map((member) => ({
      userId: member.userInfo._id,
      role: member.role,
    }));
    const newMembers: IMember[] = await memberModal.insertMany(_member);

    // step3 將 MemberIds 寫進 workspace
    const updatedWorkspace = await workspaceModal.findByIdAndUpdate(
      newWorkspac._id,
      {
        memberIds: newMembers.map((member) => member._id),
      }
    );

    // 回傳剛建立的 workspace 給前端
    return createResponse(res, 200, "新建workspace成功", updatedWorkspace);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤");
  }
};

export default addWorkspace;
