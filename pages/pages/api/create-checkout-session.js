import Stripe from "stripe";

// Initialize Stripe with your secret key (from Vercel env vars)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // accept cards
        line_items: [
          {
            price: "price_12345",        // ← Replace with your actual Price ID from Stripe
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      // Return session ID to frontend
      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Stripe session creation failed" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
