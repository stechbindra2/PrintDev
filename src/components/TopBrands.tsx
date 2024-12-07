import React from 'react';

interface Brand {
  name: string;
  logo: string;
}

interface TopBrandsProps {
  brands: Brand[];
}

export function TopBrands({ brands }: TopBrandsProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {brands.map((brand, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-12 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/150x150.png?text=${brand.name[0]}`;
            }}
          />
        </div>
      ))}
    </div>
  );
}