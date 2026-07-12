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

async function sendOrderConfirmationInvoice(session: Stripe.Checkout.Session) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyFrom = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rawarchive.vercel.app";

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
  const orderDate = new Date(session.created * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine pricing tier description
  let priceDescription = "";
  if (photoCount <= 9) {
    priceDescription = `${photoCount} photo(s) @ $1.00 each: $${photoCount.toFixed(2)}`;
  } else if (photoCount <= 19) {
    priceDescription = `${photoCount} photos (tier: 10-19 photos): $7.00 flat rate`;
  } else if (photoCount <= 29) {
    priceDescription = `${photoCount} photos (tier: 20-29 photos): $18.00 flat rate`;
  } else {
    priceDescription = `${photoCount} photos (tier: 30+ photos): $25.00 flat rate`;
  }

  const subject = `Order Confirmation & Invoice - RAW ARCHIVE #${orderId}`;

  const textBody = [
    "Order Confirmation",
    "",
    `Order ID: ${orderId}`,
    `Date: ${orderDate}`,
    "",
    "Items:",
    `Photo Editing Service - ${priceDescription}`,
    "",
    `Total Amount Paid: ${amountFormatted}`,
    "",
    metadata.editNotes ? `Your notes for editing:\n${metadata.editNotes}\n` : "",
    "Thank you for your order!",
    "We'll get your photos edited and send them to you soon.",
    "",
    `Questions? Email us at indoleanandrei5@gmail.com or visit ${siteUrl}/contact`,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: #050507; color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px;">Order Confirmation</h1>
        <p style="margin: 10px 0 0 0; color: #999;">RAW ARCHIVE PHOTOS</p>
      </div>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p><strong>Order ID:</strong> #${orderId}</p>
        <p><strong>Date:</strong> ${orderDate}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #050507;">Invoice Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 2px solid #eee;">
            <td style="padding: 12px 0;"><strong>Description</strong></td>
            <td style="padding: 12px 0; text-align: right;"><strong>Amount</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0;">Photo Editing Service - ${priceDescription}</td>
            <td style="padding: 12px 0; text-align: right;">${amountFormatted}</td>
          </tr>
          <tr style="background: #050507; color: white;">
            <td style="padding: 12px 0;"><strong>Total</strong></td>
            <td style="padding: 12px 0; text-align: right;"><strong>${amountFormatted}</strong></td>
          </tr>
        </table>
      </div>

      ${metadata.editNotes ? `
      <div style="background: #f0f8ff; padding: 15px; border-left: 4px solid #0066cc; margin-bottom: 20px; border-radius: 4px;">
        <p style="margin: 0 0 10px 0;"><strong style="color: #0066cc;">Your Editing Notes:</strong></p>
        <p style="margin: 0; white-space: pre-wrap; color: #333;">${metadata.editNotes}</p>
      </div>
      ` : ""}

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #050507;">What's Next?</h3>
        <p>Your payment has been received and confirmed. We're now working on editing your photos with care and precision. You'll receive your edited photos via email as soon as they're ready.</p>
        <p style="color: #666; font-size: 14px;">Typical turnaround time is 2-3 business days depending on the volume and complexity of your edits.</p>
      </div>

      <div style="border-top: 2px solid #eee; padding-top: 20px; margin-top: 30px; color: #666; font-size: 12px;">
        <p style="margin: 0;">© 2026 RAW ARCHIVE PHOTOS. All rights reserved.</p>
        <p style="margin: 10px 0 0 0;">Questions? <a href="mailto:indoleanandrei5@gmail.com" style="color: #0066cc; text-decoration: none;">Email us</a> or visit <a href="${siteUrl}/contact" style="color: #0066cc; text-decoration: none;">our contact page</a></p>
        <p style="margin: 10px 0 0 0;">Follow us on <a href="https://instagram.com/rawarchivephotos" style="color: #0066cc; text-decoration: none;">Instagram @rawarchivephotos</a> or <a href="https://tiktok.com/@rawarchivephotos" style="color: #0066cc; text-decoration: none;">TikTok @rawarchivephotos</a></p>
      </div>
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
      
      // Send notifications to admin
      await sendOrderNotificationEmail(session);
      await sendSmsNotification(orderId, amountTotal);
      
      // Send invoice to client
      await sendOrderConfirmationInvoice(session);
    }
  } catch (error) {
    console.error("Stripe webhook handler failed", error);
    return NextResponse.json({ message: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
