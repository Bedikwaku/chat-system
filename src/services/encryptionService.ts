import crypto from "crypto";

// Default key as fallback (32 bytes in hex = 64 characters)
const DEFAULT_KEY_HEX =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

let keyHex = process.env.ENCRYPTION_KEY || DEFAULT_KEY_HEX;

// Ensure it is exactly 64 hex characters (32 bytes)
if (!/^[0-9a-f]{64}$/i.test(keyHex)) {
  console.warn("Invalid ENCRYPTION_KEY. Using default key.");
  keyHex = DEFAULT_KEY_HEX;
}

const ENCRYPTION_KEY = Buffer.from(keyHex, "hex");
const ALGORITHM = "aes-256-cbc";

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (data: string): string => {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    "utf8"
  );
};
