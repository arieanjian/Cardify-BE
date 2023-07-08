import mongoose, { Document } from "mongoose";

declare global {
  interface IUser extends Document {
    id: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    isArchived: boolean;
    lastActiveTime: Date;
    createdAt: Date;
    updatedAt: Date;
  }

  interface INewUser
    extends Pick<IUser, "usernames" | "avatar" | "email" | "password"> {}
}
export default {};
