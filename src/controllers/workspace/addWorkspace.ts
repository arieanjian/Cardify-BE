import { NextFunction, Request, Response } from "express";
// modal
import workspaceModal from "@/models/workspace";
// util
import createResponse from "@/util/createResponse";

type INewWorkspace = Pick<IWorkspace, "name" | "memberIds" | "kanbanIds">;

const addWorkspace = async (req: Request, res: Response, _: NextFunction) => {
  try {
    // 前端傳來準備用來建立使用者的資料(middleware會把資料整理乾淨)
    const newWorkspac_data: INewWorkspace = req.body;

    const newWorkspac: IWorkspace = await workspaceModal.create(
      newWorkspac_data
    );

    // 回傳剛建立的使用者給前端
    return createResponse(res, 200, "新建workspace成功", newWorkspac);
  } catch (error) {
    // 爆開時回傳500給前端
    return createResponse(res, 500, "服務器錯誤");
  }
};

export default addWorkspace;
