import mongoose, { Document } from "mongoose";

declare global {
  interface IUser extends Document {
    _id: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    isArchived: boolean;
    lastActiveTime: Date;
    createdAt: Date;
    updatedAt: Date;
  }
}
export default {};
