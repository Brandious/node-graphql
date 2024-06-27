import * as jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId: string, email: string) => {
  return jsonwebtoken.sign({ userId, email }, process.env.JWT_SECRET!, {
    expiresIn: "7 days",
    
  });
};
