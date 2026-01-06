import Stripe from "stripe";

// This file is not used in the webhook, but is kept for other server-side Stripe actions.
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: "2024-06-20",
  }
);
