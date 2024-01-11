import { randomBytes } from "crypto";

export function generateSecureString(length = 32) {
  return randomBytes(length).toString("base64url");
}
