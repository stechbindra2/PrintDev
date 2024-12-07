import React from 'react';
import { X, Printer, Palette, Package, Users } from 'lucide-react';

interface RegisterShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (service: string) => void;
}

const services = [
  {
    id: 'design',
    title: 'Designing Service',
    description: 'Offer professional design services for various print materials',
    icon: Palette
  },
  {
    id: 'print',
    title: 'Printing Service',
    description: 'Provide high-quality printing services to customers',
    icon: Printer
  },
  {
    id: 'both',
    title: 'Printing and Designing both',
    description: 'Offer end-to-end design and print solutions',
    icon: Users
  },
  {
    id: 'bulk',
    title: 'Bulk Printing',
    description: 'Specialized in handling large volume print orders',
    icon: Package
  }
];

export function RegisterShopModal({ isOpen, onClose, onServiceSelect }: RegisterShopModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Select the service you want to register for
          </h2>
          <p className="text-gray-600 mb-8">
            Choose the type of service you'll be offering through PrintDev
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => onServiceSelect(service.id)}
                  className="p-6 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                >
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}