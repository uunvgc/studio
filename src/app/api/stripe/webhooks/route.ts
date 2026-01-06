import { headers } from 'next/headers';
import type { Stripe } from 'stripe';
import { NextResponse } from 'next/server';
import StripeSdk from "stripe";


// This is where you would update the user's plan in your database.
// For this demo, we'll just log it.
const handleSubscriptionChange = (userId: string, planId: string) => {
    console.log(`SUBSCRIPTION CHANGE: User ${userId} is now on plan ${planId}`);
    // Example database update:
    // await db.user.update({
    //   where: { id: userId },
    //   data: { plan: planId },
    // });
};


export async function POST(req: Request) {
  const stripe = new StripeSdk(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') ?? '';
  
  // Use the secret from the environment passed by App Hosting
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('❌ Stripe webhook secret not found in environment variables.');
    return NextResponse.json(
        { message: 'Server configuration error: Stripe webhook secret is missing.' },
        { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id);

  // Extract the object from the event.
  const data = event.data.object;

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = data as Stripe.Checkout.Session;
      const userId = session?.client_reference_id;

      if (!userId) {
          console.error('Webhook Error: Missing client_reference_id on checkout session.');
          return NextResponse.json({ message: 'Webhook Error: Missing user ID' }, { status: 400 });
      }

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const planId = subscription.items.data[0].price.id;
      
      console.log(`User ${userId} just subscribed to price ID: ${planId}`);
      // Now you can map this priceId to your app's plan tiers ('pro', 'beast') and update the user.
      handleSubscriptionChange(userId, planId);

      break;
    }

    case 'invoice.payment_succeeded': {
      // Used for recurring payments
      const invoice = data as Stripe.Invoice;
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
      
      // The user ID is stored as metadata on the subscription
      const userId = subscription.metadata.userId;
      if (!userId) {
        console.error('Webhook Error: Missing userId on subscription metadata for recurring payment.');
        return NextResponse.json({ message: 'Webhook Error: Missing user ID' }, { status: 400 });
      }
      
      const planId = subscription.items.data[0].price.id;
      console.log(`Recurring payment successful for user ${userId} on plan ${planId}`);
      handleSubscriptionChange(userId, planId);

      break;
    }

    default:
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event.
  return NextResponse.json({ received: true });
}
