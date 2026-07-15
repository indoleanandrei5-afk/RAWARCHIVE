import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isTrustedAdminMutation, verifyAdminRequest } from "@/lib/adminAuth";
import { updateAdminOrder } from "@/lib/adminOrders";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[
        character
      ] ?? character,
  );
}

function validateDownloadUrls(value: unknown): string[] {
  if (!Array.isArray(value) || value.length === 0) return [];

  return value.flatMap((candidate) => {
    if (typeof candidate !== "string") return [];
    try {
      const url = new URL(candidate.trim());
      return url.protocol === "https:" || url.protocol === "http:" ? [url.toString()] : [];
    } catch {
      return [];
    }
  });
}

async function sendEditedPhotosEmail(
  clientEmail: string,
  editedUrls: string[],
  orderId: string,
  deliveryRequestId: string,
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyFrom = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) throw new Error("Email delivery is not configured.");

  const safeOrderId = escapeHtml(orderId);
  const downloadLinks = editedUrls
    .map(
      (url, index) => `
        <a href="${escapeHtml(url)}" style="display:block;margin:0 0 10px;padding:14px 18px;border:1px solid #dedbd4;border-radius:999px;color:#111;text-decoration:none;font-weight:600;">
          Download photo ${index + 1} <span style="float:right;color:#777;">↗</span>
        </a>`,
    )
    .join("");

  const subject = `Your photos are ready — RAW ARCHIVE #${orderId}`;
  const textBody = [
    "Your photos are ready.",
    "",
    "I gave the set one last pass. Everything is ready to download:",
    ...editedUrls.map((url, index) => `Photo ${index + 1}: ${url}`),
    "",
    "That’s it. No account to remember, no mysterious portal.",
    "",
    "Keep the originals somewhere safe, and save the finished files to your own device.",
    "Thank you for trusting me with them.",
    "",
    "— Andrei",
    "RAW ARCHIVE PHOTOS",
  ].join("\n");

  const htmlBody = `
    <div style="margin:0;background:#f3f1ec;padding:32px 14px;color:#171717;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #dedbd4;border-radius:24px;background:#fff;">
        <div style="background:#090909;padding:22px 28px;color:#fff;font-size:12px;letter-spacing:2px;">RAW ARCHIVE PHOTOS</div>
        <div style="padding:36px 28px;">
          <p style="margin:0 0 12px;color:#777;font-size:12px;letter-spacing:1.8px;text-transform:uppercase;">Order #${safeOrderId}</p>
          <h1 style="margin:0;font-family:Georgia,serif;font-size:36px;font-weight:400;line-height:1.12;">Your photos are ready.</h1>
          <p style="margin:18px 0 26px;color:#444;font-size:16px;line-height:1.7;">I gave the set one last pass. Everything is ready to download.</p>
          ${downloadLinks}
          <p style="margin:28px 0 0;color:#555;font-size:14px;line-height:1.7;">That’s it. No account to remember, no mysterious portal.</p>
          <p style="margin:12px 0 0;color:#555;font-size:14px;line-height:1.7;">Keep the originals somewhere safe, and save the finished files to your own device.</p>
          <p style="margin:26px 0 0;font-size:15px;line-height:1.7;">Thank you for trusting me with them.<br><strong>— Andrei</strong></p>
        </div>
      </div>
    </div>`;

  const deliveryHash = createHash("sha256").update(editedUrls.join("\n")).digest("hex").slice(0, 16);
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
      "Idempotency-Key": `delivery-${orderId}-${deliveryRequestId || deliveryHash}`,
    },
    body: JSON.stringify({
      from: notifyFrom,
      to: [clientEmail],
      subject,
      text: textBody,
      html: htmlBody,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    throw new Error(`Email delivery failed: ${errorText}`);
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  if (!isTrustedAdminMutation(request)) {
    return NextResponse.json({ message: "Request origin rejected." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
    const clientEmail = typeof body.clientEmail === "string" ? body.clientEmail.trim() : "";
    const editedUrls = validateDownloadUrls(body.editedUrls);
    const deliveryRequestId = typeof body.deliveryRequestId === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(body.deliveryRequestId)
      ? body.deliveryRequestId
      : "";

    if (!orderId || !sessionId.startsWith("cs_") || editedUrls.length === 0) {
      return NextResponse.json({ message: "Add an order ID and at least one valid download link." }, { status: 400 });
    }

    if (!clientEmail || !clientEmail.includes("@")) {
      return NextResponse.json({ message: "This order needs a valid client email." }, { status: 400 });
    }

    await sendEditedPhotosEmail(clientEmail, editedUrls, orderId, deliveryRequestId);
    await updateAdminOrder(sessionId, "ready", editedUrls);

    return NextResponse.json({ message: "Finished photos sent.", orderId, emailSentTo: clientEmail });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The finished photos could not be sent.";
    console.error("Send edited photos error:", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
