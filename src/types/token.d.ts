import { JwtPayload } from "jsonwebtoken";

declare global {
  interface IDecodedToken extends JwtPayload {
    userId: string;
  }
}
export default {};
