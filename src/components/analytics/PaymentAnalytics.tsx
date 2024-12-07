import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface PaymentAnalyticsProps {
  dailyPayments: {
    date: string;
    amount: number;
  }[];
  paymentMethods: {
    method: string;
    count: number;
  }[];
}

export function PaymentAnalytics({ dailyPayments, paymentMethods }: PaymentAnalyticsProps) {
  const lineChartData = {
    labels: dailyPayments.map(p => p.date),
    datasets: [
      {
        label: 'Daily Payments',
        data: dailyPayments.map(p => p.amount),
        borderColor: '#f0ab2f',
        backgroundColor: 'rgba(240, 171, 47, 0.1)',
        fill: true,
      },
    ],
  };

  const doughnutChartData = {
    labels: paymentMethods.map(p => p.method),
    datasets: [
      {
        data: paymentMethods.map(p => p.count),
        backgroundColor: [
          '#f0ab2f',
          '#5e17eb',
          '#10b981',
          '#f59e0b',
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Trends
        </h3>
        <div className="h-64">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Methods Distribution
        </h3>
        <div className="h-64">
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}