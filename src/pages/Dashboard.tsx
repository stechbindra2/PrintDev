import React from 'react';
import { ServiceCategories } from '../components/ServiceCategories';
import { TopBrands } from '../components/TopBrands';
import { ServiceList } from '../components/ServiceList';
import { ExploreOptions } from '../components/ExploreOptions';

const printingCategories = [
  { name: 'Documents', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=300' },
  { name: 'Photos', image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=300' },
  { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=300' },
  { name: 'Banners', image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=300' },
  { name: 'Marketing', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=300' },
  { name: 'Stationery', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300' }
];

const designCategories = [
  { name: 'Graphic Design', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=300' },
  { name: 'Web Design', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=300' },
  { name: 'Logo Design', image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=300' },
  { name: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=300' },
  { name: 'Illustrations', image: 'https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&fit=crop&w=300' },
  { name: '3D Design', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=300' }
];

const topBrands = [
  { name: 'PrintHub', logo: 'https://logo.clearbit.com/printhub.com' },
  { name: 'DesignCraft', logo: 'https://logo.clearbit.com/designcraft.com' },
  { name: 'CreativeSpace', logo: 'https://logo.clearbit.com/creativespace.com' },
  { name: 'PrintMaster', logo: 'https://logo.clearbit.com/printmaster.com' },
  { name: 'ArtisanPrints', logo: 'https://logo.clearbit.com/artisanprints.com' },
  { name: 'DesignStudio', logo: 'https://logo.clearbit.com/designstudio.com' }
];

const services = [
  {
    id: 1,
    name: 'Premium Design Studio',
    rating: 4.8,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800',
    tags: ['Logo Design', 'Branding', 'Web Design'],
    priceRange: '₹₹₹'
  },
  {
    id: 2,
    name: 'Creative Solutions Hub',
    rating: 4.6,
    reviews: 850,
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800',
    tags: ['Print Design', 'Packaging', 'Marketing'],
    priceRange: '₹₹'
  },
  {
    id: 3,
    name: 'Digital Arts Studio',
    rating: 4.9,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b21d?auto=format&fit=crop&w=800',
    tags: ['UI/UX', 'App Design', 'Illustrations'],
    priceRange: '₹₹₹₹'
  }
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServiceCategories 
          printingCategories={printingCategories} 
          designCategories={designCategories} 
        />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top brands for you</h2>
          <TopBrands brands={topBrands} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Services</h2>
          <ServiceList services={services} />
        </div>

        <div className="mt-12">
          <ExploreOptions />
        </div>
      </div>
    </div>
  );
}