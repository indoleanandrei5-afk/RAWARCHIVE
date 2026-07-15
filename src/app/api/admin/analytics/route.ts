import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { getAdminAnalytics } from "@/lib/googleAnalytics";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const requestedRange = Number(request.nextUrl.searchParams.get("range") || 30);
  const range = [7, 30, 90].includes(requestedRange) ? requestedRange : 30;
  try {
    return NextResponse.json(await getAdminAnalytics(range), {
      headers: { "Cache-Control": "private, no-store, max-age=0" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analytics could not be loaded.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
