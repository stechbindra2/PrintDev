import express from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        userId: req.user.id,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Process wallet payment
router.post('/wallet-payment', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;

    // Get user's wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.id },
    });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient wallet balance',
      });
    }

    // Process wallet payment
    const [payment, updatedWallet] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          amount,
          method: 'wallet',
          status: 'completed',
          userId: req.user.id,
        },
      }),
      prisma.wallet.update({
        where: { userId: req.user.id },
        data: {
          balance: {
            decrement: amount,
          },
        },
      }),
    ]);

    res.json({
      success: true,
      orderId: payment.id,
      remainingBalance: updatedWallet.balance,
    });
  } catch (error) {
    console.error('Wallet payment failed:', error);
    res.status(500).json({
      success: false,
      message: 'Payment processing failed',
    });
  }
});

// Payment webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await prisma.payment.create({
          data: {
            amount: paymentIntent.amount / 100,
            method: 'card',
            status: 'completed',
            userId: paymentIntent.metadata.userId,
            transactionId: paymentIntent.id,
          },
        });
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await prisma.payment.create({
          data: {
            amount: failedPayment.amount / 100,
            method: 'card',
            status: 'failed',
            userId: failedPayment.metadata.userId,
            transactionId: failedPayment.id,
            errorMessage: failedPayment.last_payment_error?.message,
          },
        });
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default router;