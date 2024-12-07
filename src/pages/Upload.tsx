import React from 'react';
import { FileUpload } from '../components/FileUpload';

export function Upload() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Print Store</h1>
        <p className="text-xl text-gray-600">Blinkit provides Safe & Secure printouts</p>
      </div>
      <FileUpload />
    </div>
  );
}