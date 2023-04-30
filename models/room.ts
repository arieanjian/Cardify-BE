import mongoose, { Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  price: number;
  rating: number;
  createT: Date;
}

const roomSchema = new mongoose.Schema<IRoom>(
  {
    name: {
      type: String,
      default: "",
      required: [true, "名稱必填"],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "價格必填"],
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    createT: {
      type: Date,
      default: Date.now,
      select: false, // 不要傳到前台
    },
  },
  {
    collection: "room", // 指定 collection 名稱，不然預設會加s
    versionKey: false,
    // timestamps: true, // 會自動帶入建立時間跟修改時間
  }
);

const RoomModal = mongoose.model("room", roomSchema);

export default RoomModal;
