import ICookies from "cookies";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { JWTSecret } from "../../config/be";
import { validate } from "../../middleware/validate";
import ISession from "../../types/ISession";
import { decrypt } from "../../utils/crypto";

async function SessionHandler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new ICookies(req, res);
  const session = cookies.get("x-raid-session");
  try {
    const data = session
      ? {
          ...(jwt.verify(decrypt(session), JWTSecret) as ISession),
          token: decrypt(session),
        }
      : undefined;
    return res.json({
      data,
      status: session ? "authenticated" : "unauthenticated",
    });
  } catch (error) {
    res.redirect("/");
  }
}

export default validate(SessionHandler);
