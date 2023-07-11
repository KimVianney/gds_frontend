// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { defaultCookieConfig } from "../../config/be";
import { baseURL } from "../../config/be";
import { HttpError } from "../../error";
import { validate } from "../../middleware/validate";
import { encrypt } from "../../utils/crypto";
import { modifyToken } from "../../utils/jwt";

export interface RegisterResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  access?: string;
  error?: Record<string, unknown>;
}

const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
      .required(),
  })
  .label("body")
  .required();

async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = new Cookies(req, res);
    const {
      email,
      firstName: first_name,
      lastName: last_name,
      password,
    } = req.body;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      password,
    });
    // const response = await fetch (`http://127.0.01/auth/register/`)
    const response = await fetch(`${baseURL}/auth/register/`, {
      headers,
      method: "POST",
      body,
    });
    const { status } = response;
    if (status === 201) {
      const json = (await response.json()) as RegisterResponse;
      const { access, user } = json;
      cookies.set(
        "x-raid-session",
        encrypt(modifyToken(access, user)),
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

export default validate(registerHandler, registerSchema, ["POST"]);
