import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

interface PrintShopProps {
  name: string;
  rating: number;
  location: string;
  image: string;
  distance: string;
  isOpen: boolean;
}

export function PrintShopCard({ name, rating, location, image, distance, isOpen }: PrintShopProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <div className="relative">
        <img className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105" src={image} alt={name} />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 text-primary fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-secondary" />
          <span>{location}</span>
          <span className="mx-2">•</span>
          <span>{distance}</span>
        </div>
        <div className="mt-2 flex items-center">
          <Clock className="h-4 w-4 mr-1 text-secondary" />
          <span className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <button className="mt-4 w-full py-2 px-4 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
}