import mongoose, { Schema, Document } from "mongoose";

interface ISchema extends IWorkspace {}

const workspaceSchema = new Schema<ISchema>(
  {
    name: {
      type: String,
      default: "",
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "member",
      },
    ],
    kanbanIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "kanban",
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
    toJSON: { virtuals: true },
  }
);

// workspaceSchema.virtual("kanbanInfos", {
//   ref: "kanban",
//   localField: "kanbanIds",
//   foreignField: "_id",
//   // justOne: false,
// });

const WorkspaceModal = mongoose.model<ISchema>("Workspace", workspaceSchema);

export default WorkspaceModal;
