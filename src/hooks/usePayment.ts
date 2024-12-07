import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentDetails {
  amount: number;
  method: 'card' | 'wallet';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

export function usePayment() {
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (paymentDetails: PaymentDetails) => {
    try {
      if (paymentDetails.method === 'card') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to initialize');

        // Create payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: paymentDetails.amount,
            currency: 'inr',
          }),
        });

        const { clientSecret } = await response.json();

        // Confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: {
              number: paymentDetails.cardNumber!,
              exp_month: parseInt(paymentDetails.expiryDate!.split('/')[0]),
              exp_year: parseInt('20' + paymentDetails.expiryDate!.split('/')[1]),
              cvc: paymentDetails.cvv!,
            },
            billing_details: {
              name: paymentDetails.cardName,
            },
          },
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        return {
          success: true,
          orderId: result.paymentIntent.id,
        };
      } else {
        // Handle wallet payment
        const response = await fetch('/api/wallet-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: paymentDetails.amount,
          }),
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message);
        }

        return {
          success: true,
          orderId: result.orderId,
        };
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    error,
    processPayment,
  };
}