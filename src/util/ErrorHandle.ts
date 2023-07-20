import { Error as MongooseError } from "mongoose";
import { Response } from "express";

const ErrorHandle = (res: Response, error: any): string => {
  if (error instanceof MongooseError.ValidationError) {
    return error.message;
  }

  return error;
};

export default ErrorHandle;
