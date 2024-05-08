import mongoose, { Document } from "mongoose";

declare global {
    interface IList extends Document {
        _id: Types.ObjectId;
        name: string;
        order: number;
        kanbanId: Types.ObjectId;
        workspaceId: Types.ObjectId;
        createdAt: Date;
        updatedAt: Date;
    }
}
export default {};