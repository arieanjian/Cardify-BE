import mongoose, { Schema } from "mongoose";

interface ISchema extends IKanban {}

const kanbanSchema = new Schema<ISchema>({
  name: {
    type: String,
    default: "",
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
  },
  listIds: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  isPinned: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const kanbanModal = mongoose.model<ISchema>("kanban", kanbanSchema);

export default kanbanModal;
