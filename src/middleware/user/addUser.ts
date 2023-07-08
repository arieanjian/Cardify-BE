import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// 驗證欄位、給予 default 值
const schema = Joi.object({
  username: Joi.string().empty("").required().messages({
    "any.required": "please input username",
  }),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  avatar: Joi.string().allow("").default(""),
});

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = schema.validate(req.body);
  if (error === undefined) {
    req.body = value;
    return next();
  }

  return res.status(405).json({
    msg: error.details[0],
    state: 405,
    data: {},
  });
};

export default addUser;
