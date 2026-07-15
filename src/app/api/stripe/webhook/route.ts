import { after, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const maxDuration = 30;

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
  socialMediaConsent?: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[
        character
      ] ?? character,
  );
}

function formatSocialConsent(value: string | undefined) {
  if (value === "allow") return "Approved for social media and portfolio use";
  if (value === "deny") return "Not approved (private delivery only)";
  return "Not specified";
}

function formatMultiline(value: string | undefined) {
  if (!value) return "None";
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join("\n");
}

async function sendOrderNotificationEmail(session: Stripe.Checkout.Session, idempotencyKey: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_TO_EMAIL;
  const notifyFrom = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rawarchivephotos.com";

  if (!resendApiKey || !notifyTo) {
    console.warn("Skipping order email notification: RESEND_API_KEY or NOTIFY_TO_EMAIL missing.");
    return;
  }

  const metadata = (session.metadata ?? {}) as SessionMetadata;
  const customerEmail = session.customer_details?.email || "Not provided";
  const amountPaid = typeof session.amount_total === "number" ? `$${(session.amount_total / 100).toFixed(2)}` : "Unknown";
  const socialConsent = formatSocialConsent(metadata.socialMediaConsent);

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
    `Social media usage: ${socialConsent}`,
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
    <p><strong>Social media usage:</strong> ${socialConsent}</p>
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
      "Idempotency-Key": idempotencyKey,
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

async function sendOrderConfirmationInvoice(session: Stripe.Checkout.Session, idempotencyKey: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyFrom = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rawarchivephotos.com";

  const clientEmail = session.customer_details?.email;
  if (!resendApiKey || !clientEmail) {
    console.warn("Skipping client invoice: RESEND_API_KEY or client email missing.");
    return;
  }

  const metadata = (session.metadata ?? {}) as SessionMetadata;
  const orderId = metadata.orderId || "unknown";
  const photoCount = parseInt(metadata.photoCount || "0", 10);
  const amountTotal = session.amount_total || 0;
  const amountFormatted = `$${(amountTotal / 100).toFixed(2)}`;
  const socialConsent = formatSocialConsent(metadata.socialMediaConsent);
  const orderDate = new Date(session.created * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine pricing description
  let priceDescription = "";
  const discount = Math.floor(photoCount / 10) * 3;
  const calculatedTotal = photoCount - discount;
  if (discount === 0) {
    priceDescription = `${photoCount} photo(s) @ $1.00 each: $${photoCount.toFixed(2)}`;
  } else {
    priceDescription = `${photoCount} photos @ $1.00 each minus $${discount.toFixed(2)} bundle discount: $${calculatedTotal.toFixed(2)}`;
  }

  const subject = `You’re booked — RAW ARCHIVE #${orderId}`;

  const textBody = [
    "Payment made it.",
    "The photos are officially my problem now—the good kind.",
    "",
    `Order ID: ${orderId}`,
    `Date: ${orderDate}`,
    "",
    "Receipt:",
    `Photo editing — ${priceDescription}`,
    "",
    `Total Amount Paid: ${amountFormatted}`,
    `Social media usage: ${socialConsent}`,
    "",
    metadata.editNotes ? `Your notes for editing:\n${metadata.editNotes}\n` : "",
    "I’ll read your notes, edit every photograph by hand, and give the full set one last pass before it leaves.",
    "Most orders are ready in 2–3 business days. I’ll email you the moment yours is done.",
    "No AI, no generated details, no strange surprises.",
    "",
    `Questions? Email us at indoleanandrei5@gmail.com or visit ${siteUrl}/contact`,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="margin:0;background:#f3f1ec;padding:32px 14px;color:#171717;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #dedbd4;border-radius:24px;background:#fff;">
      <div style="background:#090909;color:white;padding:22px 28px;font-size:12px;letter-spacing:2px;">
        RAW ARCHIVE PHOTOS
      </div>

      <div style="padding:36px 28px;">
      <p style="margin:0 0 12px;color:#777;font-size:12px;letter-spacing:1.8px;text-transform:uppercase;">Order #${escapeHtml(orderId)}</p>
      <h1 style="margin:0;font-family:Georgia,serif;font-size:36px;font-weight:400;line-height:1.12;">Payment made it.</h1>
      <p style="margin:16px 0 28px;color:#444;font-size:16px;line-height:1.7;">The photos are officially my problem now—the good kind.</p>

      <div style="background:#f5f3ef;padding:18px;border-radius:16px;margin-bottom:24px;font-size:14px;line-height:1.65;">
        <p><strong>Date:</strong> ${orderDate}</p>
        <p><strong>Email:</strong> ${escapeHtml(clientEmail)}</p>
        <p><strong>Social media usage:</strong> ${socialConsent}</p>
      </div>

      <div style="margin-bottom:24px;">
        <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:400;">Receipt</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 2px solid #eee;">
            <td style="padding: 12px 0;"><strong>Description</strong></td>
            <td style="padding: 12px 0; text-align: right;"><strong>Amount</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0;">Photo editing — ${priceDescription}</td>
            <td style="padding: 12px 0; text-align: right;">${amountFormatted}</td>
          </tr>
          <tr style="border-top:2px solid #111;">
            <td style="padding:14px 0;"><strong>Total paid</strong></td>
            <td style="padding:14px 0;text-align:right;"><strong>${amountFormatted}</strong></td>
          </tr>
        </table>
      </div>

      ${metadata.editNotes ? `
      <div style="background:#f5f3ef;padding:18px;margin-bottom:24px;border-radius:16px;">
        <p style="margin:0 0 8px;"><strong>Your note</strong></p>
        <p style="margin:0;white-space:pre-wrap;color:#444;line-height:1.65;">${escapeHtml(metadata.editNotes)}</p>
      </div>
      ` : ""}

      <div style="margin-bottom:24px;">
        <h2 style="margin:0 0 10px;font-family:Georgia,serif;font-size:24px;font-weight:400;">What happens now</h2>
        <p style="margin:0;color:#444;line-height:1.7;">I’ll read your notes, edit every photograph by hand, and give the full set one last pass before it leaves.</p>
        <p style="margin:12px 0 0;color:#444;line-height:1.7;">Most orders are ready in 2–3 business days. I’ll email you the moment yours is done.</p>
        <p style="margin:12px 0 0;color:#444;line-height:1.7;">No AI, no generated details, no strange surprises.</p>
      </div>

      <div style="border-top:1px solid #dedbd4;padding-top:20px;margin-top:28px;color:#666;font-size:13px;line-height:1.6;">
        <p style="margin:0;">Questions? <a href="mailto:indoleanandrei5@gmail.com" style="color:#111;">Email me</a> or visit <a href="${siteUrl}/contact" style="color:#111;">the contact page</a>.</p>
        <p style="margin:16px 0 0;color:#111;"><strong>— Andrei</strong><br>RAW ARCHIVE PHOTOS</p>
      </div>
      </div>
      </div>
    </div>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
      "Idempotency-Key": idempotencyKey,
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
    throw new Error(`Failed to send invoice email: ${errorText}`);
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

async function sendCheckoutNotifications(eventId: string, session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId || "unknown";
  const amountTotal = session.amount_total || 0;
  const jobs = [
    {
      label: "admin email",
      run: () => sendOrderNotificationEmail(session, `stripe-${eventId}-admin-email`),
    },
    {
      label: "SMS",
      run: () => sendSmsNotification(orderId, amountTotal),
    },
    {
      label: "customer invoice",
      run: () => sendOrderConfirmationInvoice(session, `stripe-${eventId}-customer-invoice`),
    },
  ];

  const results = await Promise.allSettled(jobs.map((job) => job.run()));
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Stripe post-payment ${jobs[index].label} failed`, {
        eventId,
        orderId,
        error: result.reason,
      });
    }
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json(
      { message: "Webhook not configured." },
      { status: 503 },
    );
  }

  if (!signature) {
    return NextResponse.json({ message: "Missing Stripe signature." }, { status: 400 });
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      after(() => sendCheckoutNotifications(event.id, session));
    } else {
      console.warn("Checkout completed before payment was confirmed", {
        eventId: event.id,
        sessionId: session.id,
        paymentStatus: session.payment_status,
      });
    }
  }

  return NextResponse.json({ received: true, eventId: event.id });
}
