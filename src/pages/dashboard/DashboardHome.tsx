import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { OrdersList } from '../../components/dashboard/OrdersList';
import { useAuthContext } from '../../contexts/AuthContext';

export function DashboardHome() {
  const { user } = useAuthContext();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your {user?.role === 'printer' ? 'print shop' : 'design agency'} today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Today's Orders</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
            <p className="mt-1 text-sm text-green-600">↑ 8% from yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">₹24,500</p>
            <p className="mt-1 text-sm text-green-600">↑ 12% from yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">3</p>
            <p className="mt-1 text-sm text-red-600">↑ 2 new orders</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">4.8</p>
            <p className="mt-1 text-sm text-green-600">↑ 0.2 from last week</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
          <OrdersList />
        </div>
      </div>
    </DashboardLayout>
  );
}