import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../config.env"),
});

export const getToken = (user: IUser) => {
  // 產生jwt token
  const token = jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_EXPIRES_DAY || "7d",
    }
  );

  return token;
};
