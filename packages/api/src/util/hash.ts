import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// Pass the password string and get hashed password back
// ( and store only the hashed string in your database)
const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

/**
 * Verifies a hash against a password
 * @param {string} pass The password
 * @param {string} hash The hash
 */
export const verifyHash = async (pass: string, hash: string) => {
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassword(pass, salt);
  const textEncoder = new TextEncoder();
  return timingSafeEqual(textEncoder.encode(originalPassHash), textEncoder.encode(currentPassHash));
};

/**
 * Generates a hash from plain text
 * @param {string} pass The password
 * @returns {Promise<string>} Password hash
 */
export const createHash = async (pass: string): Promise<string> => {
  const salt = randomBytes(16).toString("hex");
  return encryptPassword(pass, salt) + salt;
};
