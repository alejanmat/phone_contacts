import { NextFunction } from "express";
import { IncomingHttpHeaders } from "http";

const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "blablablabla";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeaderKey = "jwt-token";
  const authToken = req.headers[tokenHeaderKey];
  if (!authToken) {
    return next(new Error("Token error"));
  }

  jwt.verify(authToken, JWT_SECRET_KEY, (err: any, payload: any) => {
    if (err) return next(new Error("Token error"));

    next();
  });
};
