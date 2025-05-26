import crypto from "crypto";
import { Logger } from "../../objects/Logging/logger.js";

// Default key as fallback (32 bytes in hex = 64 characters)
const DEFAULT_KEY_HEX =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

let keyHex = process.env.ENCRYPTION_KEY || DEFAULT_KEY_HEX;

// Ensure it is exactly 64 hex characters (32 bytes)
if (!/^[0-9a-f]{64}$/i.test(keyHex)) {
  Logger.warn("Invalid ENCRYPTION_KEY. Using default key.");
  keyHex = DEFAULT_KEY_HEX;
}

export enum ALGORITHMS {
  AES_256_CBC = "aes-256-cbc",
  AES_128_CBC = "aes-128-cbc",
  DES_EDE3_CBC = "des-ede3-cbc",
  SHA_256 = "sha256",
  SHA_512 = "sha512",
}

const ENCRYPTION_KEY = Buffer.from(keyHex, "hex");

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ALGORITHMS.AES_256_CBC,
    ENCRYPTION_KEY,
    iv
  );
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

/**
 * Generates a short 8-character hash from a string.
 * @param content Input string to hash.
 * @returns 8-character base64url-style hash.
 */
const generateShortHash = (content: string): string => {
  const fullHash = crypto
    .createHash(ALGORITHMS.SHA_256)
    .update(content)
    .digest("base64url");
  return fullHash.substring(0, 8); // Trim to 8 characters
};
export const decrypt = (data: string): string => {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    ALGORITHMS.AES_256_CBC,
    ENCRYPTION_KEY,
    iv
  );
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    "utf8"
  );
};

export const generateKey = (
  content?: string,
  prefix: string = "pk#"
): string => {
  if (!content) {
    // create random string
    return `${prefix}${generateShortHash(
      Math.random().toString(36).substring(2, 15)
    )}`;
  }
  return `${prefix}${generateShortHash(content)}`;
};
