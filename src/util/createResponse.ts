import { Response } from "express";

const createResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = {}
) => {
  return res.status(status).json({
    status,
    msg: message,
    data,
  });
};

export default createResponse;
