import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  {
    id: 1,
    name: 'Shop Information',
    description: 'Basic details about your shop'
  },
  {
    id: 2,
    name: 'Menu and operational details',
    description: 'Services and working hours'
  },
  {
    id: 3,
    name: 'Required documents',
    description: 'Legal and business documents'
  },
  {
    id: 4,
    name: 'Partner contract',
    description: 'Review and accept terms'
  }
];

export function RegistrationSidebar() {
  const currentStep = 1;

  return (
    <div className="hidden lg:block w-80 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Complete your registration
        </h2>

        <nav className="space-y-6">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-start ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className={`h-5 w-5 ${isCurrent ? 'text-primary' : ''}`} />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-primary' : ''}`}>
                    {step.name}
                  </p>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}