import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "insecure_dev_secret";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
