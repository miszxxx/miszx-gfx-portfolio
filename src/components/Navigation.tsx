import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg transform rotate-45" />
            <span className="text-white font-bold text-xl">MISZX'S GFX</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-purple-400 bg-purple-400/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/designs"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/designs') 
                  ? 'text-purple-400 bg-purple-400/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded transform rotate-45" />
              <span>Designs</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin') 
                  ? 'text-purple-400 bg-purple-400/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};