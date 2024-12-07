import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Search,
  X,
  LogIn,
  Store
} from 'lucide-react';
import { Logo } from './Logo';
import { LocationModal } from './LocationModal';

const SEARCH_SUGGESTIONS = [
  { type: 'service', name: 'Color Printing' },
  { type: 'service', name: 'Black & White Printing' },
  { type: 'service', name: 'Document Scanning' },
  { type: 'service', name: 'Photo Printing' }
];

interface NavbarProps {
  onLoginClick: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [locationName, setLocationName] = useState("Detecting location...");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const filteredSuggestions = searchQuery
    ? SEARCH_SUGGESTIONS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            if (data.results?.[0]?.components) {
              const { city, state } = data.results[0].components;
              setLocationName(`${city || state}, India`);
            }
          } catch (error) {
            setLocationName("Location unavailable");
          }
        },
        () => {
          setLocationName("Location access denied");
        }
      );
    } else {
      setLocationName("Location not supported");
    }
  }, []);

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo className="h-8 w-auto" />
              </Link>

              <button 
                onClick={() => setIsLocationModalOpen(true)}
                className="ml-6 flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span className="ml-1 text-sm">{locationName}</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for print shops, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Search Suggestions */}
              {isSearchFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-2">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(item.name);
                            setIsSearchFocused(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md flex items-center space-x-2"
                        >
                          <Search className="h-4 w-4 text-gray-400" />
                          <span>{item.name}</span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {item.type}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link to="/upload" className="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Upload Files
              </Link>
              <Link to="/partner" className="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Store className="h-4 w-4 mr-1" />
                Become a Partner
              </Link>
              <div className="h-6 w-px bg-gray-200"></div>
              <button 
                onClick={onLoginClick}
                className="text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </button>
              <Link 
                to="/signup" 
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Click outside handler for search suggestions */}
        {isSearchFocused && (
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => setIsSearchFocused(false)}
          />
        )}
      </nav>

      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={setLocationName}
      />
    </>
  );
}