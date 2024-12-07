import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { DeliveryStats } from '../../components/delivery/DeliveryStats';
import { ActiveDeliveries } from '../../components/delivery/ActiveDeliveries';
import { DeliveryHistory } from '../../components/delivery/DeliveryHistory';
import { useSocket } from '../../hooks/useSocket';

export function DeliveryDashboard() {
  const socket = useSocket();

  React.useEffect(() => {
    if (socket) {
      socket.on('newDelivery', (delivery) => {
        // Handle new delivery assignment
        console.log('New delivery:', delivery);
      });
    }

    return () => {
      if (socket) {
        socket.off('newDelivery');
      }
    };
  }, [socket]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your deliveries and track your performance
          </p>
        </div>

        <DeliveryStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveDeliveries />
          <DeliveryHistory />
        </div>
      </div>
    </DashboardLayout>
  );
}