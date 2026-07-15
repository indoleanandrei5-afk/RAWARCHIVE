import { NextRequest, NextResponse } from "next/server";
import { clearAdminSessionCookie, isTrustedAdminMutation } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  if (!isTrustedAdminMutation(request)) {
    return NextResponse.json({ message: "Request origin rejected." }, { status: 403 });
  }
  await clearAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
