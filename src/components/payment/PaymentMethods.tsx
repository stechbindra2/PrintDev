import React from 'react';
import { CreditCard, Wallet, Bank, QrCode } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

export function PaymentMethods({ selectedMethod, onMethodSelect }: PaymentMethodsProps) {
  const methods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Credit/Debit Card'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: QrCode,
      description: 'Google Pay, PhonePe, etc.'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Bank,
      description: 'All major banks'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: Wallet,
      description: 'Use PrintDev wallet'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {methods.map((method) => {
        const Icon = method.icon;
        return (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-6 w-6 ${
              selectedMethod === method.id ? 'text-primary' : 'text-gray-400'
            }`} />
            <div className="text-center">
              <div className={`font-medium ${
                selectedMethod === method.id ? 'text-primary' : 'text-gray-900'
              }`}>
                {method.name}
              </div>
              <div className="text-xs text-gray-500">{method.description}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}