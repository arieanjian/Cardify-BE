import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  preflightContinue: true,
};

export default corsOptions;
