import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Joi from "joi";
// member
import { validRoles } from "@/models/member";
// util
import getSchemaValue from "@/util/getSchemaValue";
import createResponse from "@/util/createResponse";

// 驗證字串是否為 mongoose ObjectId
const objectId = Joi.string()
  .empty("")
  .required()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "Object ID Validation");

// 驗證欄位、給予 default 值
const schema = Joi.array()
  .items(
    Joi.object({
      userId: objectId.messages({
        "any.invalid": "請輸入有效的 memberId",
        "any.required": "please input userId",
      }),
      role: Joi.string()
        .valid(...validRoles) // using the shared valid roles
        .messages({
          "any.only": `{#label} 只能是以下其中之一: ${validRoles.join(", ")}`,
        }),
      workspaceId: objectId.messages({
        "any.invalid": "請輸入有效的 workspaceId",
        "any.required": "please input workspaceId",
      }),
    }).unknown(true)
  )
  .min(1)
  .messages({
    "array.min": "至少要有一個成員",
  });

const addMember = async (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = schema.validate(req.body);

  // 驗證有問題就回傳第一個驗證錯誤給前端
  if (error) {
    return createResponse(res, 405, error.details[0].message);
  }

  // 透過schema把前端傳來的資料整理成後端要的格式，或是把前端多傳的東西過濾掉
  const newValue = value.map((item) => {
    return getSchemaValue(schema, item);
  });
  req.body = newValue;
  return next();
};

export default addMember;
