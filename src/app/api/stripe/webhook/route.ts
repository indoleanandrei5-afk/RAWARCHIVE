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

type SessionMetadata = {
  orderId?: string;
  photoCount?: string;
  photoNames?: string;
  editNotes?: string;
  cloudinaryFolder?: string;
  uploadedPreviewUrls?: string;
};

function formatMultiline(value: string | undefined) {
  if (!value) return "None";
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join("\n");
}

async function sendOrderNotificationEmail(session: Stripe.Checkout.Session) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_TO_EMAIL;
  const notifyFrom = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rawarchive.vercel.app";

  if (!resendApiKey || !notifyTo) {
    console.warn("Skipping order email notification: RESEND_API_KEY or NOTIFY_TO_EMAIL missing.");
    return;
  }

  const metadata = (session.metadata ?? {}) as SessionMetadata;
  const customerEmail = session.customer_details?.email || "Not provided";
  const amountPaid = typeof session.amount_total === "number" ? `$${(session.amount_total / 100).toFixed(2)}` : "Unknown";

  const uploadedPreview = metadata.uploadedPreviewUrls
    ? metadata.uploadedPreviewUrls
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((url) => `<li><a href=\"${url}\">${url}</a></li>`)
        .join("")
    : "<li>No preview links in metadata</li>";

  const subject = `New paid order${metadata.orderId ? ` #${metadata.orderId}` : ""}`;

  const textBody = [
    "A Stripe payment was completed.",
    "",
    `Order ID: ${metadata.orderId || "Unknown"}`,
    `Customer email: ${customerEmail}`,
    `Amount paid: ${amountPaid}`,
    `Photo count: ${metadata.photoCount || "Unknown"}`,
    `Photo names: ${metadata.photoNames || "Unknown"}`,
    `Cloudinary folder: ${metadata.cloudinaryFolder || "Unknown"}`,
    "Preview URLs:",
    formatMultiline(metadata.uploadedPreviewUrls),
    "",
    `Edit notes: ${metadata.editNotes || "None"}`,
    "",
    `Dashboard: ${siteUrl}/dashboard`,
    `Admin: ${siteUrl}/admin`,
  ].join("\n");

  const htmlBody = `
    <h2>New Stripe Payment Completed</h2>
    <p><strong>Order ID:</strong> ${metadata.orderId || "Unknown"}</p>
    <p><strong>Customer email:</strong> ${customerEmail}</p>
    <p><strong>Amount paid:</strong> ${amountPaid}</p>
    <p><strong>Photo count:</strong> ${metadata.photoCount || "Unknown"}</p>
    <p><strong>Photo names:</strong> ${metadata.photoNames || "Unknown"}</p>
    <p><strong>Cloudinary folder:</strong> ${metadata.cloudinaryFolder || "Unknown"}</p>
    <p><strong>Preview URLs:</strong></p>
    <ul>${uploadedPreview}</ul>
    <p><strong>Edit notes:</strong> ${metadata.editNotes || "None"}</p>
    <p><a href="${siteUrl}/dashboard">Open Dashboard</a></p>
    <p><a href="${siteUrl}/admin">Open Admin</a></p>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: notifyFrom,
      to: [notifyTo],
      subject,
      text: textBody,
      html: htmlBody,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    throw new Error(`Failed to send notification email: ${errorText}`);
  }
}

async function sendSmsNotification(orderId: string, amount: number) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;
  const toPhone = process.env.NOTIFY_TO_PHONE;

  if (!accountSid || !authToken || !fromPhone || !toPhone) {
    console.warn("Skipping SMS notification: Twilio credentials missing.");
    return;
  }

  const message = `RAW ARCHIVE: New payment received! Order #${orderId} - $${(amount / 100).toFixed(2)} 📸`;

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      From: fromPhone,
      To: toPhone,
      Body: message,
    }).toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send SMS: ${errorText}`);
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret || !signature) {
    return NextResponse.json(
      { message: "Webhook not configured. Missing STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, or signature." },
      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId || "unknown";
      const amountTotal = session.amount_total || 0;
      
      // Send notifications
      await sendOrderNotificationEmail(session);
      await sendSmsNotification(orderId, amountTotal);
    }
  } catch (error) {
    console.error("Stripe webhook handler failed", error);
    return NextResponse.json({ message: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
