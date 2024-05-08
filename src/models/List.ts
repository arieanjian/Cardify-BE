import mongoose, { Schema } from "mongoose";

interface ISchema extends IList {}

const listSchema = new Schema<ISchema>({
  name: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    default: 0,
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
  },
  kanbanId: {
    type: Schema.Types.ObjectId,
  },
});

const listModal = mongoose.model<ISchema>("list", listSchema);

export default listModal;