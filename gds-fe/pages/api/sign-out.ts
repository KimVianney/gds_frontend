import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { defaultCookieConfig } from "../../config/be";

export default async function signOutHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<unknown>> {
  if (["GET"].includes(req.method || "")) {
    const cookies = new Cookies(req, res);
    cookies.set("x-raid-session", null, defaultCookieConfig);
    return res.status(200).end();
  }
  return res.status(405).json({ message: "Method Not Allowed", status: false });
}
