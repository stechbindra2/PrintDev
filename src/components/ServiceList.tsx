import React from 'react';
import { Star } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  priceRange: string;
}

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div 
          key={service.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-48">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{service.rating}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <span>{service.reviews} reviews</span>
              <span className="mx-2">•</span>
              <span>{service.priceRange}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}