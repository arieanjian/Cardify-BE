import { NextFunction, Request, Response } from "express";
// modal
import listModal from "@/models/List";
// util
import createResponse from "@/util/createResponse";

const addList = async (req: Request, res: Response, _: NextFunction) => {
  try {
    const { name, kanbanId } = req.body;
    const lists = await listModal.find({ kanbanId }).sort("order");
    const order = lists.length ? lists.length + 1 : 0;

    const newList = await listModal.create({ name, kanbanId, order });
    return createResponse(res, 200, "新增list成功", newList);
  } catch (error) {
    return createResponse(res, 500, "服務器錯誤");
  }
};

export default addList;
