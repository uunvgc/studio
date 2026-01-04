'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// In a real app, you'd get this from your auth session
const FAKE_USER_ID = 'user_12345';

export async function createCheckoutSession(priceId: string) {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const host = headersList.get('host');
    
    // Fallback for localhost or Vercel environments
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const appUrl = origin || `${protocol}://${host}`;


    if (!appUrl) {
        throw new Error('Could not determine request origin or host.');
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
            // Pass user ID to associate the checkout session with a user
            client_reference_id: FAKE_USER_ID,
            success_url: `${appUrl}/`,
            cancel_url: `${appUrl}/upgrade`,
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
