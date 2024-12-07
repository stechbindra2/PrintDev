import React from 'react';
import { useDeliveries } from '../../hooks/useDeliveries';
import { formatPrice } from '../../lib/utils';

export function DeliveryHistory() {
  const { deliveryHistory } = useDeliveries();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Delivery History</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {deliveryHistory?.map((delivery) => (
          <div key={delivery.id} className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">Order #{delivery.orderId}</h3>
                <p className="text-sm text-gray-500">{delivery.customerName}</p>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatPrice(delivery.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {new Date(delivery.deliveredAt).toLocaleDateString()}
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${
                      star <= delivery.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}

        {deliveryHistory?.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No delivery history
          </div>
        )}
      </div>
    </div>
  );
}