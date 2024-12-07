import React from 'react';
import { useSocket } from '../../hooks/useSocket';
import { orders as ordersApi } from '../../services/api';
import { formatPrice } from '../../lib/utils';

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  paymentType: string;
  isPaid: boolean;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  createdAt: string;
  service: {
    name: string;
    price: number;
  };
}

export function OrdersList() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const socket = useSocket();

  React.useEffect(() => {
    loadOrders();
    
    if (socket) {
      socket.on('orderStatusUpdated', (updatedOrder) => {
        setOrders(prev => 
          prev.map(order => 
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('orderStatusUpdated');
      }
    };
  }, [socket]);

  const loadOrders = async () => {
    try {
      const response = await ordersApi.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            All Orders
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Pending
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Preparing
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Ready
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Order #{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {order.customerName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {order.service.name} - {formatPrice(order.service.price)}
                </p>
                {order.deliveryAddress && (
                  <p className="mt-1 text-sm text-gray-500">
                    {order.deliveryAddress}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  {formatPrice(order.totalAmount)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {order.paymentType}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              {order.status === 'pending' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Accept Order
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Mark as Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Complete Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}