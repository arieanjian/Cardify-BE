import { NextFunction, Request, Response } from "express";
import Joi from "joi";
// util
import createResponse from "@/util/createResponse";
import getSchemaValue from "@/util/getSchemaValue";

// 驗證欄位
const schema = Joi.object({
  username: Joi.string().empty("").required().messages({
    "any.required": "please input username",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "please input email",
  }),
  password: Joi.string().required().messages({
    "any.required": "please input password",
  }),
}).unknown(true);

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return createResponse(res, 405, error.details[0].message);
  }

  // 整理需要的欄位給後端
  const newValue = getSchemaValue(schema, value);
  req.body = newValue;

  return next();
};

export default signUp;
