"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession(priceId: string) {
  const headersList = await headers();
  const origin = headersList.get("origin") ?? "http://localhost:9002";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/`,
    cancel_url: `${origin}/`,
  });

  return { url: session.url };
}
