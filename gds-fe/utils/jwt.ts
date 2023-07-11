import { JWTSecret } from "../config/be";
import jsonwebtoken from "jsonwebtoken";
import User from "../types/User";

export interface DecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

export function modifyToken(token?: string, user?: User): string {
  const decoded = jsonwebtoken.verify(
    token || "",
    JWTSecret
  ) as unknown as DecodedToken;

  return jsonwebtoken.sign(
    {
      ...decoded,
      user,
    },
    JWTSecret,
    { algorithm: "HS256" }
  );
}
