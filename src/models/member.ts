import mongoose, { Schema } from "mongoose";
import Joi from "joi";
// util
import isObjectId from "@/util/isObjectId";
import { userJoi } from "@/models/user";

interface ISchema extends IMember {}

export const validRoles = ["Admin", "Member", "Owner"];

const memberSchema = new Schema<ISchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
    },
    role: {
      type: String,
      enum: validRoles,
      default: "Member",
    },
  },
  {
    timestamps: true, // generate : createdAt, updatedAt
    versionKey: false,
    toObject: { virtuals: true },
  }
);

const memberModal = mongoose.model<ISchema>("member", memberSchema);

export const addMemberJoi = Joi.object({
  _id: isObjectId.required(),
  role: Joi.string()
    .valid(...validRoles)
    .default("Member"),
  userInfo: userJoi,
});

export default memberModal;
