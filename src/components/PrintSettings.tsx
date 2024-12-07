import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

interface PrintSettingsProps {
  files: File[];
}

interface Settings {
  copies: number;
  color: 'bw' | 'color';
  orientation: 'portrait' | 'landscape';
}

export function PrintSettings({ files }: PrintSettingsProps) {
  const [settings, setSettings] = useState<Settings>({
    copies: 1,
    color: 'bw',
    orientation: 'portrait'
  });

  const calculateTotal = () => {
    const basePrice = settings.color === 'bw' ? 3 : 10;
    return basePrice * settings.copies * files.length;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Print settings</h2>
        <p className="text-sm text-gray-600 mb-6">Same print settings apply to all files</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose number of copies
            </label>
            <p className="text-xs text-gray-500 mb-2">Copies of this file you want to print</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSettings(s => ({ ...s, copies: Math.max(1, s.copies - 1) }))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center">{settings.copies}</span>
              <button
                onClick={() => setSettings(s => ({ ...s, copies: s.copies + 1 }))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose print colour
            </label>
            <p className="text-xs text-gray-500 mb-2">Save money with black & white or get color printouts</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSettings(s => ({ ...s, color: 'bw' }))}
                className={`p-4 border rounded-lg text-center ${
                  settings.color === 'bw' 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium mb-1">B&W</div>
                <div className="text-sm text-gray-600">₹3/page</div>
              </button>
              <button
                onClick={() => setSettings(s => ({ ...s, color: 'color' }))}
                className={`p-4 border rounded-lg text-center ${
                  settings.color === 'color' 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium mb-1">Color</div>
                <div className="text-sm text-gray-600">₹10/page</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose print orientation
            </label>
            <p className="text-xs text-gray-500 mb-2">Direction in which a document is displayed or printed</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSettings(s => ({ ...s, orientation: 'portrait' }))}
                className={`p-4 border rounded-lg text-center ${
                  settings.orientation === 'portrait' 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-6 h-8 border-2 border-current mx-auto mb-2"></div>
                <div className="font-medium">Portrait</div>
              </button>
              <button
                onClick={() => setSettings(s => ({ ...s, orientation: 'landscape' }))}
                className={`p-4 border rounded-lg text-center ${
                  settings.orientation === 'landscape' 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-6 border-2 border-current mx-auto mb-2"></div>
                <div className="font-medium">Landscape</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Receipt className="w-4 h-4 mr-2" />
            Total {files.length} page{files.length > 1 ? 's' : ''}
          </div>
          <div className="text-lg font-semibold">₹{calculateTotal()}</div>
        </div>
        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
          View cart
        </button>
      </div>
    </div>
  );
}