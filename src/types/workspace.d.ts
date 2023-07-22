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

  interface IWorkspaceMember extends Document {
    _id: string;
    userId: string;
    workspaceId: string;
    role: "Admin" | "Member" | "Owner";
  }
}
export default {};