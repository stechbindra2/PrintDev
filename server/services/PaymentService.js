import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import pdf from 'html-pdf';
import { format } from 'date-fns';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export class PaymentService {
  static async createPayment(data) {
    try {
      const payment = await prisma.payment.create({
        data: {
          ...data,
          status: 'pending',
        },
        include: {
          order: true,
          user: true,
        },
      });
      return payment;
    } catch (error) {
      console.error('Payment creation failed:', error);
      throw error;
    }
  }

  static async processUPIPayment(orderId, upiId) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { payment: true },
      });

      if (!order) throw new Error('Order not found');

      const paymentOrder = await razorpay.orders.create({
        amount: Math.round(order.totalAmount * 100),
        currency: 'INR',
        receipt: orderId,
        payment_capture: 1,
      });

      return {
        orderId: paymentOrder.id,
        amount: order.totalAmount,
        currency: 'INR',
        upiId,
      };
    } catch (error) {
      console.error('UPI payment processing failed:', error);
      throw error;
    }
  }

  static async generateReceipt(paymentId) {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          order: {
            include: {
              service: true,
              user: true,
            },
          },
        },
      });

      if (!payment) throw new Error('Payment not found');

      const receiptHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 800px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .details { margin-bottom: 20px; }
              .amount { font-size: 24px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Payment Receipt</h1>
                <p>Date: ${format(new Date(payment.createdAt), 'PPP')}</p>
              </div>
              <div class="details">
                <p><strong>Order ID:</strong> ${payment.order.id}</p>
                <p><strong>Transaction ID:</strong> ${payment.transactionId || 'N/A'}</p>
                <p><strong>Customer:</strong> ${payment.order.user.name}</p>
                <p><strong>Service:</strong> ${payment.order.service.name}</p>
                <p><strong>Payment Method:</strong> ${payment.method}</p>
                <p class="amount">Amount Paid: ₹${payment.amount}</p>
              </div>
            </div>
          </body>
        </html>
      `;

      return new Promise((resolve, reject) => {
        pdf.create(receiptHtml).toBuffer((err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        });
      });
    } catch (error) {
      console.error('Receipt generation failed:', error);
      throw error;
    }
  }

  static async getPaymentAnalytics(userId) {
    try {
      const [dailyPayments, methodStats] = await Promise.all([
        prisma.$queryRaw`
          SELECT 
            DATE(createdAt) as date,
            SUM(amount) as amount
          FROM Payment
          WHERE userId = ${userId}
          AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          GROUP BY DATE(createdAt)
          ORDER BY date ASC
        `,
        prisma.payment.groupBy({
          by: ['method'],
          where: { userId },
          _count: true,
        }),
      ]);

      return {
        dailyPayments,
        paymentMethods: methodStats.map(stat => ({
          method: stat.method,
          count: stat._count,
        })),
      };
    } catch (error) {
      console.error('Analytics fetching failed:', error);
      throw error;
    }
  }
}