import React, { useState } from 'react';
import { Printer, Copy, Palette } from 'lucide-react';

interface PrintOptionsProps {
  file: File;
}

interface PrintSettings {
  copies: number;
  color: 'color' | 'bw';
  orientation: 'portrait' | 'landscape';
  quality: 'draft' | 'normal' | 'high';
}

export function PrintOptions({ file }: PrintOptionsProps) {
  const [settings, setSettings] = useState<PrintSettings>({
    copies: 1,
    color: 'bw',
    orientation: 'portrait',
    quality: 'normal'
  });

  const calculatePrice = () => {
    const basePrice = settings.color === 'color' ? 10 : 5;
    const qualityMultiplier = {
      draft: 0.8,
      normal: 1,
      high: 1.5
    }[settings.quality];
    return (basePrice * settings.copies * qualityMultiplier).toFixed(2);
  };

  return (
    <div className="space-y-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="font-semibold text-gray-900 flex items-center">
        <Printer className="h-5 w-5 mr-2" />
        Print Settings
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Copies
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSettings(s => ({ ...s, copies: Math.max(1, s.copies - 1) }))}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>
            <span className="w-12 text-center">{settings.copies}</span>
            <button
              onClick={() => setSettings(s => ({ ...s, copies: s.copies + 1 }))}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Print Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSettings(s => ({ ...s, color: 'bw' }))}
              className={`p-2 rounded-lg border flex items-center justify-center space-x-2
                ${settings.color === 'bw' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            >
              <Copy className="h-4 w-4" />
              <span>Black & White</span>
            </button>
            <button
              onClick={() => setSettings(s => ({ ...s, color: 'color' }))}
              className={`p-2 rounded-lg border flex items-center justify-center space-x-2
                ${settings.color === 'color' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            >
              <Palette className="h-4 w-4" />
              <span>Color</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality
          </label>
          <select
            value={settings.quality}
            onChange={(e) => setSettings(s => ({ ...s, quality: e.target.value as PrintSettings['quality'] }))}
            className="w-full p-2 border border-gray-200 rounded-lg"
          >
            <option value="draft">Draft</option>
            <option value="normal">Normal</option>
            <option value="high">High Quality</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Estimated Price:</span>
            <span className="text-lg font-semibold">₹{calculatePrice()}</span>
          </div>
          <button
            onClick={() => {
              // Handle print order
              console.log('Print settings:', settings);
            }}
            className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Proceed to Print
          </button>
        </div>
      </div>
    </div>
  );
}