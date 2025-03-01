import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Robot } from 'lucide-react';

interface MobileNavProps {
  isTransparent?: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isTransparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50
          ${isTransparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm border-b border-gray-200'}
        `}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Robot className="w-8 h-8 text-blue-500" />
              <span className={`text-xl font-semibold ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
                CleanAgent
              </span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 ${isTransparent ? 'text-white' : 'text-gray-600'}`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-xl font-semibold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-600"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                  <Link
                    to="/features"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t">
                <Link
                  to="/signin"
                  className="block w-full px-4 py-3 text-center text-gray-800 bg-gray-50 rounded-lg mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/demo"
                  className="block w-full px-4 py-3 text-center text-white bg-blue-500 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav; 