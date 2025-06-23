import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GeometricLogo } from '../components/GeometricLogo';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              MISZX'S{' '}
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                GFX
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              High-quality graphics and motion design for your brand, stream, or project. We 
              deliver outstanding assets at affordable prices.
            </p>

            <Link
              to="/designs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 
                         text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 
                         transition-all duration-300 transform hover:scale-105 hover:shadow-xl 
                         hover:shadow-purple-500/25 group"
            >
              VIEW PORTFOLIO
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Content - Logo */}
          <div className="flex justify-center lg:justify-end">
            <GeometricLogo />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto px-4">
            This is the official portfolio for Miszx's GFX organization. A place to 
            showcase premium graphics, motion design, and creative assets for the gaming 
            and streaming community.
          </p>
        </div>
      </div>
    </div>
  );
};