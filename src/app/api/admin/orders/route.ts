import { NextRequest, NextResponse } from "next/server";
import { isTrustedAdminMutation, verifyAdminRequest } from "@/lib/adminAuth";
import { getAdminOrders, updateAdminOrder } from "@/lib/adminOrders";
import type { AdminOrderStatus } from "@/lib/adminTypes";

export const runtime = "nodejs";
export const maxDuration = 30;

const validStatuses = new Set<AdminOrderStatus>(["received", "editing", "ready", "canceled"]);

export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    return NextResponse.json(await getAdminOrders());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Orders could not be loaded.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  if (!isTrustedAdminMutation(request)) {
    return NextResponse.json({ message: "Request origin rejected." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { sessionId?: unknown; status?: unknown };
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    const status = typeof body.status === "string" ? body.status as AdminOrderStatus : null;
    if (!sessionId.startsWith("cs_") || !status || !validStatuses.has(status)) {
      return NextResponse.json({ message: "Invalid order update." }, { status: 400 });
    }

    await updateAdminOrder(sessionId, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Order status could not be updated.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
