import { NextRequest, NextResponse } from "next/server";
import {
  adminAuthIsConfigured,
  createAdminSessionToken,
  isTrustedAdminMutation,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isTrustedAdminMutation(request)) {
    return NextResponse.json({ message: "Request origin rejected." }, { status: 403 });
  }
  if (!adminAuthIsConfigured()) {
    return NextResponse.json(
      { message: "Admin access is not configured yet." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ message: "Invalid login request." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return NextResponse.json({ message: "That password is not right." }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  await setAdminSessionCookie(token);
  return NextResponse.json({ ok: true });
}
