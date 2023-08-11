import mongoose, { Schema } from "mongoose";

interface ISchema extends IMember {}

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
      enum: ["Admin", "Member", "Owner"],
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

export default memberModal;
