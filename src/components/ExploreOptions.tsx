import React from 'react';
import { ChevronDown } from 'lucide-react';

export function ExploreOptions() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Explore options near me</h2>
      
      <div className="space-y-2">
        <button className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
          <span className="text-gray-900">Popular Services Near Me</span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </button>
        
        <button className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
          <span className="text-gray-900">Top Rated Services Near Me</span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </button>
        
        <button className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
          <span className="text-gray-900">Featured Service Providers</span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}