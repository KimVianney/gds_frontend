// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { defaultCookieConfig } from "../../config/be";
import { baseURL } from "../../config/be";
import { HttpError } from "../../error";
import { validate } from "../../middleware/validate";
import User from "../../types/User";
import { encrypt } from "../../utils/crypto";
import { modifyToken } from "../../utils/jwt";

export interface SignInResponse {
  message: string;
  user?: User;
  access_token?: string;
  error?: Record<string, unknown>;
}

const signInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      .required(),
  })
  .label("body")
  .required();

async function signInHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = new Cookies(req, res);
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(req.body);
    const response = await fetch(`${baseURL}/auth/login/`, {
      headers,
      method: "POST",
      body,
    });
    const { status } = response;
    if (status === 200) {
      console.log({ response });
      const json = (await response.json()) as SignInResponse;
      const { access_token, user } = json;
      cookies.set(
        "x-raid-session",
        encrypt(modifyToken(access_token, user)),
        defaultCookieConfig
      );
      return res.status(status).json(json);
    }
    const bodyText = await response.text();
    throw new HttpError(bodyText, status);
  } catch (error) {
    const status = (error as HttpError).status || 400;
    return res.status(status).json({
      status,
      message: JSON.parse((error as HttpError).message),
    });
  }
}

export default validate(signInHandler, signInSchema, ["POST"]);
