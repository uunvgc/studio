'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(priceId: string) {
    const headersList = headers();
    const origin = headersList.get('origin');

    if (!origin) {
        throw new Error('Could not determine request origin.');
    }
    
    if (!priceId) {
        throw new Error('Price ID is required to create a checkout session.');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/upgrade`,
        });

        if (session.url) {
            redirect(session.url);
        } else {
            throw new Error('Failed to create a checkout session URL.');
        }

    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        // We throw the error so the frontend can catch it and display a message.
        // In a real app, you might want to redirect to an error page or handle it differently.
        throw new Error('Failed to create Stripe checkout session.');
    }
}
