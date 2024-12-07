import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

export function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Card Number"
        {...register('cardNumber', { 
          required: 'Card number is required',
          pattern: {
            value: /^[0-9]{16}$/,
            message: 'Please enter a valid card number'
          }
        })}
        error={errors.cardNumber?.message as string}
        placeholder="1234 5678 9012 3456"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          {...register('expiryDate', { 
            required: 'Expiry date is required',
            pattern: {
              value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
              message: 'Please enter a valid expiry date (MM/YY)'
            }
          })}
          error={errors.expiryDate?.message as string}
          placeholder="MM/YY"
        />

        <Input
          label="CVV"
          type="password"
          {...register('cvv', { 
            required: 'CVV is required',
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Please enter a valid CVV'
            }
          })}
          error={errors.cvv?.message as string}
          placeholder="123"
        />
      </div>

      <Input
        label="Name on Card"
        {...register('cardName', { 
          required: 'Card holder name is required' 
        })}
        error={errors.cardName?.message as string}
        placeholder="John Doe"
      />

      <Button
        type="submit"
        isLoading={isProcessing}
        className="w-full"
      >
        Pay Now
      </Button>
    </form>
  );
}