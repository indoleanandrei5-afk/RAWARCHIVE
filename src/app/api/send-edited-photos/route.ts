import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe secret key not configured.");
  }
  return new Stripe(secretKey, {
    apiVersion: "2026-06-24.dahlia",
  });
}

async function sendEditedPhotosEmail(clientEmail: string, editedUrls: string[], orderId: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyFrom = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rawarchive.vercel.app";

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY not configured.");
  }

  if (!clientEmail) {
    throw new Error("Client email not provided.");
  }

  const downloadLinks = editedUrls
    .map((url) => `<li><a href="${url}" style="color: #0066cc; text-decoration: none;">${url}</a></li>`)
    .join("");

  const subject = `Your edited photos are ready! - Order #${orderId}`;

  const textBody = [
    "Your edited photos are ready for download!",
    "",
    "Download your photos:",
    ...editedUrls.map((url) => `- ${url}`),
    "",
    "Thank you for using RAW ARCHIVE!",
    "Follow us on Instagram: @rawarchivephotos or TikTok: @rawarchivephotos",
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Your Edited Photos Are Ready!</h2>
      <p>Hi there,</p>
      <p>Your edited photos from order <strong>#${orderId}</strong> are now ready to download.</p>
      
      <h3>Download Your Photos:</h3>
      <ul style="list-style: none; padding: 0;">
        ${downloadLinks}
      </ul>
      
      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
        Thank you for choosing RAW ARCHIVE for your photo editing needs!<br>
        Follow us on Instagram: <strong>@rawarchivephotos</strong> or TikTok: <strong>@rawarchivephotos</strong>
      </p>
    </div>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
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
    throw new Error(`Failed to send email: ${errorText}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, editedUrls, clientEmail } = body;

    if (!orderId || !editedUrls || !Array.isArray(editedUrls) || editedUrls.length === 0) {
      return NextResponse.json(
        { message: "Missing or invalid: orderId, editedUrls (array)" },
        { status: 400 }
      );
    }

    // If clientEmail not provided, try to fetch from Stripe
    let email = clientEmail;
    if (!email) {
      try {
        const stripe = getStripe();
        // Try to find the session by searching metadata
        // This is a workaround - in production you'd store sessionId in Order
        console.warn("clientEmail not provided and Stripe lookup not fully implemented");
        return NextResponse.json(
          { message: "clientEmail required (Stripe lookup not implemented)" },
          { status: 400 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "Unable to determine client email" },
          { status: 400 }
        );
      }
    }

    await sendEditedPhotosEmail(email, editedUrls, orderId);

    return NextResponse.json({
      message: "Edited photos email sent successfully",
      orderId,
      emailSentTo: email,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send edited photos email";
    console.error("Send edited photos error:", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
