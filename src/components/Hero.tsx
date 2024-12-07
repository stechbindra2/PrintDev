import React from 'react';
import { Upload, Printer, Truck } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-secondary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Professional Printing</span>
                <span className="block text-primary">Made Simple</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Connect with local print shops, upload your documents, and get high-quality prints delivered to your doorstep.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start space-x-4">
                <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors duration-200 md:py-4 md:text-lg md:px-10">
                  Start Printing
                </button>
              </div>
            </div>
          </main>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="bg-primary/10 p-3 rounded-full">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Upload Documents</h3>
              <p className="mt-2 text-sm text-gray-600">Easily upload your files in various formats</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="bg-primary/10 p-3 rounded-full">
                <Printer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Choose Print Options</h3>
              <p className="mt-2 text-sm text-gray-600">Customize your print specifications</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-sm text-gray-600">Get your prints delivered quickly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
