import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { secret, tokens } from "../config/fe";

const token = tokens.create(secret);

console.log({ secret, token });

export function csrf(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const csrfHeader = req.headers["x-csrf-token"] as string;
      if (!csrfHeader) {
        throw new Error("CSRF header is missing");
      }
      if (!tokens.verify(secret, csrfHeader)) {
        throw new Error("CSRF header is invalid");
      }
      return handler(req, res);
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: (error as ValidationError).message,
        errors: (error as ValidationError).errors,
      });
    }
  };
}
