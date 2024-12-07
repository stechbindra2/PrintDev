import React from 'react';
import { format } from 'date-fns';
import { Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface PaymentReceiptProps {
  payment: {
    id: string;
    amount: number;
    method: string;
    status: string;
    createdAt: string;
    transactionId?: string;
    order: {
      id: string;
      customerName: string;
      service: {
        name: string;
      };
    };
  };
}

export function PaymentReceipt({ payment }: PaymentReceiptProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/payments/${payment.id}/receipt`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${payment.id}.pdf`;
      link.click();
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Payment Receipt',
        text: `Payment receipt for order ${payment.order.id}`,
        url: `${window.location.origin}/receipts/${payment.id}`,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error('Failed to share receipt:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Payment Receipt</h2>
          <p className="text-sm text-gray-500">
            {format(new Date(payment.createdAt), 'PPP')}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{payment.order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-medium">{payment.transactionId || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="font-medium">{payment.order.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Service</p>
            <p className="font-medium">{payment.order.service.name}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium capitalize">{payment.method}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="text-xl font-semibold text-primary">₹{payment.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}