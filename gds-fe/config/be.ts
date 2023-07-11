import { SetOption } from "cookies";

export class MissingExpectedValue extends Error {
  public readonly statusCode = 500;

  constructor(message: string) {
    super(`MissingExpectedValueError: ${message}`);
  }
}

export type Environment = "production" | "test" | "development";

export function requiredStringVariable(name: string): string {
  const value = process.env[name];

  if (!value || value.length < 1) {
    throw new MissingExpectedValue(
      `Invalid or missing environment variable provided for ${name}`
    );
  }
  return value;
}

export function presentNumberParser(name: string): number {
  console.log(process.env.NEXT_PUBLIC_LOG_LEVEL);
  const parsed = process.env[name] && parseInt(process.env[name] as string);
  if (!parsed) {
    throw new MissingExpectedValue(
      `Invalid or missing numerical environment variable for ${name} ${process.env[name]}`
    );
  }
  return parsed;
}

export function presentEnumInvariant<T>(range: T[], enumName: string): T {
  const value = process.env[enumName] as unknown as T;

  if (range.includes(value)) {
    return value;
  }
  throw new MissingExpectedValue(
    `Invalid value provided for enum ${enumName} ${value}`
  );
}

export const logLevels = ["fatal", "error", "warn", "info", "debug", "trace"];

export const defaultCookieConfig: SetOption = {
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
};

export const JWTSecret = requiredStringVariable("JWT_SECRET");

export const cryptoAlgorithm = requiredStringVariable("CRYPTO_ALGORITHM");
export const cryptoIV = requiredStringVariable("CRYPTO_IV");
export const cryptoKey = requiredStringVariable("CRYPTO_KEY");
export const baseURL = requiredStringVariable("BASE_URL");
// export const baseURL = "127.0.0.1:8000";
