import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { getSharedStorageConfigurationError } from "@/lib/supabase-admin";

export const ADMIN_SESSION_COOKIE = "ttb_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export function getAdminConfigurationError() {
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 16) {
    return "Set ADMIN_PASSWORD to a unique value of at least 16 characters.";
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!sessionSecret || sessionSecret.length < 32) {
    return "Set ADMIN_SESSION_SECRET to a random value of at least 32 characters.";
  }

  return getSharedStorageConfigurationError();
}

export function isAdminPasswordValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const providedBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export function createAdminSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE;
  const payload = String(expiresAt);
  const signature = createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function isAdminSessionTokenValid(token: string | undefined) {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;

  const separator = token.indexOf(".");
  if (separator < 1) return false;

  const payload = token.slice(0, separator);
  const expiresAt = Number(payload);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const providedSignature = Buffer.from(token.slice(separator + 1));
  const expectedSignature = Buffer.from(
    createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
      .update(payload)
      .digest("base64url")
  );

  return (
    providedSignature.length === expectedSignature.length &&
    timingSafeEqual(providedSignature, expectedSignature)
  );
}
