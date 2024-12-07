import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showEmailOption, setShowEmailOption] = useState(false);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP sending logic here
    console.log('Sending OTP to:', phoneNumber);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>

          {!showEmailOption ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300">
                  <img 
                    src="https://flagcdn.com/w20/in.png" 
                    alt="India" 
                    className="w-5 h-auto"
                  />
                  <span className="ml-2 text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 px-4 py-3 focus:outline-none"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
              >
                Send One Time Password
              </button>

              <div className="relative text-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <span className="relative bg-white px-4 text-sm text-gray-500">or</span>
              </div>

              <button
                type="button"
                onClick={() => setShowEmailOption(true)}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                Continue with Email
              </button>

              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <img 
                  src="https://www.google.com/favicon.ico" 
                  alt="Google" 
                  className="w-5 h-5 mr-2"
                />
                Sign in with Google
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
              >
                Continue with Email
              </button>
              <button
                onClick={() => setShowEmailOption(false)}
                className="w-full text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to phone login
              </button>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            New to PrintDev?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}