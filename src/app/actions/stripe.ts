"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession(priceId: string) {
  const headersList = await headers();
  const origin = headersList.get("origin") ?? "http://localhost:9002";
  
  // A placeholder user ID. In a real app, you would get this from your auth session.
  const userId = "user_placeholder_id";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/`,
    cancel_url: `${origin}/`,
    // Pass the user ID to link the checkout session to your user
    client_reference_id: userId, 
    // For recurring payments, we'll store the user ID in the subscription's metadata.
    subscription_data: {
      metadata: {
        userId: userId,
      }
    }
  });

  return { url: session.url };
}
