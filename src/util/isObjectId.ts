import Joi from "joi";
import mongoose from "mongoose";

// 驗證字串是否為 mongoose ObjectId
const isObjectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "Object ID Validation");

export default isObjectId;
