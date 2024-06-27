import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import * as jwt from "jsonwebtoken";
import { unless } from "express-unless";

export const verifyTokenMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("Unauthorized");
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");

    next();
  });
};

verifyTokenMiddleware.unless = unless;
