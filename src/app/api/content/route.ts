import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, getAdminConfigurationError, isAdminSessionTokenValid } from "@/lib/admin-session";
import { getSharedStorageConfigurationError, getSupabaseAdmin } from "@/lib/supabase-admin";

const CONTENT_ID = "published";
const MAX_CONTENT_BYTES = 4 * 1024 * 1024;

function isSiteContent(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const content = value as Record<string, unknown>;
  return (
    typeof content.company === "object" &&
    content.company !== null &&
    typeof content.hero === "object" &&
    content.hero !== null &&
    Array.isArray(content.projects) &&
    Array.isArray(content.clients) &&
    Array.isArray(content.services) &&
    Array.isArray(content.values) &&
    Array.isArray(content.team) &&
    (content.valuesGalleryImages === undefined ||
      (Array.isArray(content.valuesGalleryImages) &&
        content.valuesGalleryImages.every((imageUrl) => typeof imageUrl === "string"))) &&
    typeof content.careers === "object" &&
    content.careers !== null
  );
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || new URL(origin).host === new URL(request.url).host;
}

async function hasAdminSession() {
  const cookieStore = await cookies();
  return isAdminSessionTokenValid(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET() {
  const configurationError = getSharedStorageConfigurationError();
  if (configurationError) {
    return NextResponse.json({ error: configurationError }, { status: 503 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", CONTENT_ID)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json(
      { content: data?.content ?? null },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to load shared TTB content:", error);
    return NextResponse.json(
      { error: "Shared content could not be loaded. Check the Supabase setup." },
      { status: 503 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  const configurationError = getAdminConfigurationError();
  if (configurationError) {
    return NextResponse.json({ error: configurationError }, { status: 503 });
  }
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Administrator sign-in is required." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_CONTENT_BYTES) {
    return NextResponse.json({ error: "Content backup exceeds the 4 MB limit." }, { status: 413 });
  }

  let rawContent: string;
  try {
    rawContent = await request.text();
  } catch {
    return NextResponse.json({ error: "The content request could not be read." }, { status: 400 });
  }
  if (new TextEncoder().encode(rawContent).byteLength > MAX_CONTENT_BYTES) {
    return NextResponse.json({ error: "Content backup exceeds the 4 MB limit." }, { status: 413 });
  }

  let content: unknown;
  try {
    content = JSON.parse(rawContent);
  } catch {
    return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 });
  }

  if (!isSiteContent(content)) {
    return NextResponse.json({ error: "The submitted site content is incomplete or invalid." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("site_content").upsert({
      id: CONTENT_ID,
      content,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("Failed to save shared TTB content:", error);
    return NextResponse.json(
      { error: "Content could not be saved to shared storage. Your changes are not published." },
      { status: 503 }
    );
  }
}
