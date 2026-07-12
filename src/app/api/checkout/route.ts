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

export async function POST(request: Request) {
  const body = await request.json();
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ message: "Stripe secret key not configured." }, { status: 500 });
  }

  const items = body.items ?? [];
  const metadata = body.metadata ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ message: "No items provided for checkout." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Photo order",
          },
          unit_amount: item.unit_amount,
        },
        quantity: item.quantity || 1,
      })),
      metadata,
      success_url: `${origin}/upload?success=true`,
      cancel_url: `${origin}/upload?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe checkout session.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
