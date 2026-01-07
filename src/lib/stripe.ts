import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error("STRIPE_SECRET_KEY is not set in the production environment.");
  }
  console.warn("Stripe secret key not found. Using a dummy key for development. This will not work for real transactions.");
}

export const stripe = new Stripe(
  stripeSecretKey || 'sk_test_dummy_key', // Use a dummy key if the secret is not found in development
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);