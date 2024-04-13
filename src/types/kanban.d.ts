import mongoose, { Document } from "mongoose";

declare global {
  interface IKanban extends Document {
    _id: Types.ObjectId;
    name: string;
    workspaceId: Types.ObjectId;
    listIds: string[];
    isArchived: boolean;
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}
export default {};
