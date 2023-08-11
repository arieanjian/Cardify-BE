import mongoose, { Schema, Document } from "mongoose";

interface ISchema extends IWorkspace {}

const workspaceSchema = new Schema<ISchema>(
  {
    name: {
      type: String,
      default: "",
    },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "member",
      },
    ],
    kanbanIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Kanban",
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // generate : createdAt, updatedAt
    versionKey: false,
    toObject: { virtuals: true },
  }
);

const WorkspaceModal = mongoose.model<ISchema>("Workspace", workspaceSchema);

export default WorkspaceModal;
