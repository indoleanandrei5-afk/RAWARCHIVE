import { NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_PER_PHOTO_CENTS = 100;
const MAX_PHOTOS_PER_ORDER = 100;

// Pricing rule: total equals photo count, except every 10th photo threshold gets
// a cumulative $3 discount (10 -> 7, 20 -> 14, 30 -> 21, ...).
function calculateTieredPrice(photoCount: number): number {
  if (photoCount <= 0) return 0;
  const discountBlocks = Math.floor(photoCount / 10);
  return (photoCount - discountBlocks * 3) * 100;
}

type CheckoutItem = {
  name?: unknown;
};

function sanitizeMetadataValue(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function sanitizeUrlList(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .filter((item) => typeof item === "string" && item.startsWith("http"))
    .map((item) => String(item).trim())
    .filter(Boolean)
    .join("\n")
    .slice(0, 500);
}

function sanitizeEditNotes(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 450);
}

function sanitizePhotoName(value: unknown, fallbackIndex: number) {
  if (typeof value !== "string") return `Photo ${fallbackIndex + 1}`;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 80) : `Photo ${fallbackIndex + 1}`;
}

function getPhotoNames(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => sanitizePhotoName((item as CheckoutItem).name, index));
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe secret key not configured.");
  }
  return new Stripe(secretKey, {
    apiVersion: "2026-06-24.dahlia",
  });
}

export async function POST(request: Request) {
  let body: {
    items?: unknown;
    editNotes?: unknown;
    orderId?: unknown;
    cloudinaryFolder?: unknown;
    uploadedPreviewUrls?: unknown;
    socialMediaConsent?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid checkout payload." }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ message: "Stripe secret key not configured." }, { status: 500 });
  }

  const photoNames = getPhotoNames(body.items);
  const photoCount = photoNames.length;
  const editNotes = sanitizeEditNotes(body.editNotes);
  const orderId = sanitizeMetadataValue(body.orderId, 80);
  const cloudinaryFolder = sanitizeMetadataValue(body.cloudinaryFolder, 180);
  const uploadedPreviewUrls = sanitizeUrlList(body.uploadedPreviewUrls);
  const socialMediaConsentRaw = sanitizeMetadataValue(body.socialMediaConsent, 20).toLowerCase();
  const socialMediaConsent = socialMediaConsentRaw === "allow" || socialMediaConsentRaw === "deny"
    ? socialMediaConsentRaw
    : "";

  if (photoCount === 0) {
    return NextResponse.json({ message: "No items provided for checkout." }, { status: 400 });
  }

  if (photoCount > MAX_PHOTOS_PER_ORDER) {
    return NextResponse.json(
      { message: `Maximum ${MAX_PHOTOS_PER_ORDER} photos per order.` },
      { status: 400 },
    );
  }

  const origin = request.headers.get("origin") || "http://localhost:3000";
  const tieredPrice = calculateTieredPrice(photoCount);

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Photo editing service",
            },
            unit_amount: tieredPrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        ...(orderId ? { orderId } : {}),
        photoCount: String(photoCount),
        photoNames: photoNames.join(", ").slice(0, 500),
        ...(cloudinaryFolder ? { cloudinaryFolder } : {}),
        ...(uploadedPreviewUrls ? { uploadedPreviewUrls } : {}),
        ...(editNotes ? { editNotes } : {}),
        ...(socialMediaConsent ? { socialMediaConsent } : {}),
      },
      success_url: `/success`,
      cancel_url: `${origin}/upload?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe checkout session.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
