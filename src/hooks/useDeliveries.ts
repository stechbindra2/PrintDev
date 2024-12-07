import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';
import api from '../services/api';

interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  status: 'assigned' | 'picked' | 'delivered';
  amount: number;
  rating?: number;
  deliveredAt?: string;
}

export function useDeliveries() {
  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([]);
  const [deliveryHistory, setDeliveryHistory] = useState<Delivery[]>([]);
  const socket = useSocket();

  useEffect(() => {
    loadDeliveries();

    if (socket) {
      socket.on('deliveryUpdated', (delivery) => {
        if (delivery.status === 'delivered') {
          setActiveDeliveries(prev => prev.filter(d => d.id !== delivery.id));
          setDeliveryHistory(prev => [delivery, ...prev]);
        } else {
          setActiveDeliveries(prev =>
            prev.map(d => d.id === delivery.id ? delivery : d)
          );
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('deliveryUpdated');
      }
    };
  }, [socket]);

  const loadDeliveries = async () => {
    try {
      const [activeRes, historyRes] = await Promise.all([
        api.get('/delivery/active'),
        api.get('/delivery/history')
      ]);
      setActiveDeliveries(activeRes.data);
      setDeliveryHistory(historyRes.data);
    } catch (error) {
      console.error('Error loading deliveries:', error);
    }
  };

  const updateDeliveryStatus = async (deliveryId: string, status: 'picked' | 'delivered') => {
    try {
      const response = await api.patch(`/delivery/${deliveryId}/status`, { status });
      if (status === 'delivered') {
        setActiveDeliveries(prev => prev.filter(d => d.id !== deliveryId));
        setDeliveryHistory(prev => [response.data, ...prev]);
      } else {
        setActiveDeliveries(prev =>
          prev.map(d => d.id === deliveryId ? response.data : d)
        );
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return {
    activeDeliveries,
    deliveryHistory,
    updateDeliveryStatus
  };
}