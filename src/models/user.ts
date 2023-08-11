import mongoose, { Schema } from "mongoose";

interface ISchema extends IUser {}

const userSchema = new Schema<ISchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "",
    },
    username: {
      type: String,
      required: true,
      trim: true,
      default: "",
      minlength: 2,
      maxLength: 100,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      default: "",
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    lastActiveTime: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    timestamps: true, // generate : createdAt, updatedAt
    versionKey: false,
    toObject: { virtuals: true },
  }
);

const UserModal = mongoose.model<ISchema>("User", userSchema);

export default UserModal;
