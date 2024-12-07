import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

interface Category {
  name: string;
  image: string;
}

interface ServiceCategoriesProps {
  printingCategories: Category[];
  designCategories: Category[];
}

export function ServiceCategories({ printingCategories, designCategories }: ServiceCategoriesProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-4 border-b border-gray-200">
          <Tab className={`px-4 py-2 text-sm font-medium focus:outline-none ${
            selectedTab === 0 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}>
            Printing Services
          </Tab>
          <Tab className={`px-4 py-2 text-sm font-medium focus:outline-none ${
            selectedTab === 1 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}>
            Design Services
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {printingCategories.map((category, index) => (
                <div 
                  key={index}
                  className="relative rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white font-medium text-sm">
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {designCategories.map((category, index) => (
                <div 
                  key={index}
                  className="relative rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white font-medium text-sm">
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}