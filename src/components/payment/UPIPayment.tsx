import React, { useState } from 'react';
import { QrCode, Smartphone } from 'lucide-react';
import QRCode from 'qrcode';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface UPIPaymentProps {
  amount: number;
  onSubmit: (upiId: string) => void;
  isProcessing: boolean;
}

export function UPIPayment({ amount, onSubmit, isProcessing }: UPIPaymentProps) {
  const [upiId, setUpiId] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<'id' | 'qr'>('id');

  React.useEffect(() => {
    if (paymentMode === 'qr') {
      generateQRCode();
    }
  }, [paymentMode]);

  const generateQRCode = async () => {
    try {
      const upiUrl = `upi://pay?pa=merchant@upi&pn=PrintDev&am=${amount}&cu=INR`;
      const qrImage = await QRCode.toDataURL(upiUrl);
      setQrCode(qrImage);
    } catch (err) {
      console.error('QR Code generation failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setPaymentMode('id')}
          className={`flex-1 p-3 border rounded-lg flex items-center justify-center space-x-2 ${
            paymentMode === 'id' ? 'border-primary bg-primary/5' : 'border-gray-200'
          }`}
        >
          <Smartphone className="h-5 w-5" />
          <span>Enter UPI ID</span>
        </button>
        <button
          onClick={() => setPaymentMode('qr')}
          className={`flex-1 p-3 border rounded-lg flex items-center justify-center space-x-2 ${
            paymentMode === 'qr' ? 'border-primary bg-primary/5' : 'border-gray-200'
          }`}
        >
          <QrCode className="h-5 w-5" />
          <span>Scan QR Code</span>
        </button>
      </div>

      {paymentMode === 'id' ? (
        <div className="space-y-4">
          <Input
            label="UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="username@upi"
          />
          <Button
            onClick={() => onSubmit(upiId)}
            isLoading={isProcessing}
            className="w-full"
          >
            Pay ₹{amount}
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          {qrCode && (
            <div className="bg-white p-4 rounded-lg inline-block">
              <img src={qrCode} alt="Payment QR Code" className="w-48 h-48" />
            </div>
          )}
          <p className="text-sm text-gray-600">
            Scan this QR code using any UPI app to pay
          </p>
        </div>
      )}
    </div>
  );
}