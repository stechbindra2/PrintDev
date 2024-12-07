import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { usePayment } from '../../hooks/usePayment';
import { Button } from '../../components/ui/Button';
import { PaymentForm } from '../../components/payment/PaymentForm';
import { OrderSummary } from './OrderSummary';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { total } = useCart();
  const { processPayment } = usePayment();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (paymentDetails: any) => {
    try {
      setIsProcessing(true);
      const result = await processPayment({
        amount: total,
        method: paymentMethod,
        ...paymentDetails
      });

      if (result.success) {
        navigate('/order-confirmation', { 
          state: { orderId: result.orderId } 
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg flex items-center space-x-3 ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200'
                  }`}
                >
                  <CreditCard className={`h-5 w-5 ${
                    paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <span className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}>
                    Card Payment
                  </span>
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 border rounded-lg flex items-center space-x-3 ${
                    paymentMethod === 'wallet'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200'
                  }`}
                >
                  <Wallet className={`h-5 w-5 ${
                    paymentMethod === 'wallet' ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <span className={paymentMethod === 'wallet' ? 'text-primary' : 'text-gray-600'}>
                    Wallet
                  </span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <PaymentForm 
                  onSubmit={handlePayment}
                  isProcessing={isProcessing}
                />
              )}

              {paymentMethod === 'wallet' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Available balance: ₹1,500
                  </p>
                  <Button
                    onClick={() => handlePayment({ type: 'wallet' })}
                    isLoading={isProcessing}
                    className="w-full"
                  >
                    Pay from Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}