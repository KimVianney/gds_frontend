import { cryptoAlgorithm, cryptoIV, cryptoKey } from "../config/be";
import crypto from "crypto";

const algorithm = "aes-256-cbc";

export function encrypt(text: string): string {
  const iv = Buffer.from(cryptoIV || "", "hex");
  const key = Buffer.from(cryptoKey || "", "hex");
  const cipher = crypto.createCipheriv(cryptoAlgorithm || algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

export function decrypt(text: string): string {
  const iv = Buffer.from(cryptoIV || "", "hex");
  const key = Buffer.from(cryptoKey || "", "hex");
  const encryptedText = Buffer.from(text, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
