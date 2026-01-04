"use server";

import Stripe from "stripe";
import { headers } from "next/headers";

/* ✅ REAL STRIPE PRICE IDS */
const PRO_PRICE_ID = "price_1SlnBhEQzx4Eitcg1fP3Er07";
const BEAST_PRICE_ID = "price_1SlnBAEQzx4EitcgDGwMSaQx";

/* 🔐 STRIPE SETUP */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20",
});

/* 🛒 SERVER ACTION */
export async function createCheckoutSession(
  plan: "pro" | "beast"
) {
  const headersList = headers();
  const origin = headersList.get("origin");

  if (!origin) {
    throw new Error("Missing origin");
  }

  const priceId =
    plan === "pro"
      ? PRO_PRICE_ID
      : BEAST_PRICE_ID;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
  });

  return { url: session.url };
}
