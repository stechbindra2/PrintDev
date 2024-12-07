import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, FileText, Clock, CreditCard } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../hooks/useCart';
import { Button } from '../../components/ui/Button';

export function OrderSummary() {
  const navigate = useNavigate();
  const { cart, total } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Details */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Printer className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.service.name}</h3>
                  <p className="text-sm text-gray-500">{item.quantity} copies</p>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{item.files.length} files</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>2-3 hours</span>
                  </div>
                </div>
              </div>
              <span className="font-medium text-gray-900">
                {formatPrice(item.service.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="text-gray-900">{formatPrice(40)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Platform Fee</span>
            <span className="text-gray-900">{formatPrice(20)}</span>
          </div>
          <div className="flex justify-between font-medium text-base pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>{formatPrice(total + 60)}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-3">
          <Button
            onClick={handleCheckout}
            className="w-full flex items-center justify-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>Proceed to Payment</span>
          </Button>
          <p className="text-xs text-center text-gray-500">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}