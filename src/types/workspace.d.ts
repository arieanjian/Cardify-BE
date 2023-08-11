import mongoose, { Document } from "mongoose";

declare global {
  interface IWorkspace extends Document {
    _id: string;
    name: string;
    memberIds: string[];
    kanbanIds: string[];
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IMember extends Document {
    _id: string;
    userId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    role: "Admin" | "Member" | "Owner";
  }
}
export default {};
