import React from 'react';
import { Hero } from '../components/Hero';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: "Order Online",
    description: "Order prints and get them delivered",
    image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?auto=format&fit=crop&w=800"
  },
  {
    title: "Printing",
    description: "Order prints at your favorite shop",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800"
  },
  {
    title: "Bulk Orders",
    description: "Special rates for bulk printing",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=800"
  }
];

const collections = [
  {
    title: "Top Printing Shops",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800",
    count: "20 places"
  },
  {
    title: "Best Value Printing Places",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=800",
    count: "15 places"
  },
  {
    title: "Best Scanning Places",
    image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?auto=format&fit=crop&w=800",
    count: "12 places"
  },
  {
    title: "Newly Opened Places",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800",
    count: "8 places"
  }
];

const localities = [
  { name: "Connaught Place", count: "388 places" },
  { name: "Sector 18", count: "388 places" },
  { name: "Sector 29, Noida", count: "388 places" },
  { name: "Rajouri Garden", count: "388 places" },
  { name: "Saket", count: "388 places" },
  { name: "DLF Cyber City", count: "388 places" },
  { name: "Golf Course Road", count: "388 places" },
  { name: "DLF Phase 4", count: "388 places" },
  { name: "see more", count: "" }
];

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                  <p className="text-white/80">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collections Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Collections</h2>
        <p className="text-gray-600 mb-8">Explore curated lists of top printing shops in Delhi NCR</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{collection.title}</h3>
                  <p className="text-white/80 text-sm">{collection.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Localities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular localities in and around Delhi NCR</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localities.map((locality, index) => (
            <button
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-medium text-gray-900">{locality.name}</h3>
                {locality.count && <p className="text-sm text-gray-500">{locality.count}</p>}
              </div>
              {locality.count && <ArrowRight className="h-5 w-5 text-gray-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Get the App Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get the PrintDev App</h2>
              <p className="text-gray-600 mb-8">We will send you a link, open it on your phone to download the app</p>
              
              <div className="flex space-x-4 mb-8">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Share App Link
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <a href="#" className="block">
                  <img src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png" alt="Download on App Store" className="h-10" />
                </a>
                <a href="#" className="block">
                  <img src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png" alt="Get it on Google Play" className="h-10" />
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src="https://b.zmtcdn.com/data/o2_assets/a500ffc2ab483bc6a550aa635f4e55531648107832.png"
                alt="PrintDev App"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}