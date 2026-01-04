"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20",
});

export async function createCheckoutSession(priceId: string) {
  // Use headers() if you want origin dynamically, otherwise fallback
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
  });

  return { url: session.url };
}
