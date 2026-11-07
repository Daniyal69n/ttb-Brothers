import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  if (submissionsByIp.size > 1000) {
    for (const [key, entry] of submissionsByIp) {
      if (entry.resetAt <= now) submissionsByIp.delete(key);
    }
    while (submissionsByIp.size > 1000) {
      const oldestKey = submissionsByIp.keys().next().value;
      if (!oldestKey) break;
      submissionsByIp.delete(oldestKey);
    }
  }

  const current = submissionsByIp.get(ip);

  if (!current || current.resetAt <= now) {
    submissionsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_SUBMISSIONS;
}

function getTextField(
  body: Record<string, unknown>,
  key: string,
  maxLength: number,
  required = true
) {
  const value = body[key];
  if (typeof value !== "string") return required ? null : "";

  const trimmed = value.trim();
  if ((required && !trimmed) || trimmed.length > maxLength) return null;
  return trimmed;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "The inquiry is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "The inquiry could not be read." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "The inquiry is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "A valid inquiry is required." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "A valid inquiry is required." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  if (typeof fields.website === "string" && fields.website.trim()) {
    return NextResponse.json({ message: "Your inquiry was sent." });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many inquiries were submitted. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const fullName = getTextField(fields, "fullName", 120);
  const email = getTextField(fields, "email", 254);
  const organization = getTextField(fields, "organization", 160, false);
  const inquiryType = getTextField(fields, "inquiryType", 80);
  const subject = getTextField(fields, "subject", 200);
  const message = getTextField(fields, "message", 5000);

  if (
    !fullName ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !inquiryType ||
    !subject ||
    !message ||
    message.length < 15
  ) {
    return NextResponse.json(
      { error: "Please check the required fields and try again." },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password || !Number.isInteger(port) || port < 1 || port > 65535) {
    return NextResponse.json(
      { error: "Email delivery is not configured. Please contact us directly by email." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    await transporter.sendMail({
      from: { name: "TTB Website", address: user },
      to: "info@ttb.org.pk",
      replyTo: email,
      subject: `[TTB Inquiry - ${inquiryType}] ${subject.replace(/[\r\n]+/g, " ")}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Organization: ${organization || "N/A"}`,
        `Inquiry type: ${inquiryType}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ message: "Your inquiry was sent to our corporate desk." });
  } catch (error) {
    console.error("Contact form email delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your inquiry. Please email info@ttb.org.pk directly." },
      { status: 502 }
    );
  } finally {
    transporter.close();
  }
}
