import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { getUserInfo } from "../services/auth";

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const [type, tokenValue] = token.split(" ");
  if (type !== "Bearer") {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const user = await getUserInfo(tokenValue);
    req.headers.user = JSON.stringify(user);
    next();
  } catch (error: unknown) {
    return res.status(401).json({ message: (error as AxiosError).message });
  }
};

export { userValidation };
