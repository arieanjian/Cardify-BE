import { NextFunction, Request, Response } from "express";
import Joi from "joi";
// util
import getSchemaValue from "@/util/getSchemaValue";
import createResponse from "@/util/createResponse";
import { addMemberJoi } from "@/models/member";

// 驗證欄位、給予 default 值
const schema = Joi.object({
  name: Joi.string().empty("").required().messages({
    "any.required": "please input workspace name",
  }),
  members: Joi.array()
    .items(addMemberJoi)
    .messages({
      "any.invalid": "請輸入有效的 members array",
    })
    .default([]),
}).unknown(true);

const addWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value, error } = schema.validate(req.body);

  // 驗證有問題就回傳第一個驗證錯誤給前端
  if (error) {
    console.log(error);
    return createResponse(res, 405, error.details[0].message);
  }

  // 透過schema把前端傳來的資料整理成後端要的格式，或是把前端多傳的東西過濾掉
  const newValue = getSchemaValue(schema, value);
  req.body = newValue;
  return next();
};

export default addWorkspace;
