import React from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { useDeliveries } from '../../hooks/useDeliveries';

export function ActiveDeliveries() {
  const { activeDeliveries, updateDeliveryStatus } = useDeliveries();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Active Deliveries</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {activeDeliveries?.map((delivery) => (
          <div key={delivery.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Order #{delivery.orderId}</h3>
                <p className="text-sm text-gray-500">{delivery.customerName}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                delivery.status === 'picked' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {delivery.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{delivery.deliveryAddress}</span>
              </div>

              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">{delivery.customerPhone}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              {delivery.status === 'assigned' && (
                <button
                  onClick={() => updateDeliveryStatus(delivery.id, 'picked')}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Pick Up Order
                </button>
              )}

              {delivery.status === 'picked' && (
                <button
                  onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Delivered
                </button>
              )}

              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {activeDeliveries?.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No active deliveries
          </div>
        )}
      </div>
    </div>
  );
}