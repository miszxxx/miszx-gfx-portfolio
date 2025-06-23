import React from 'react';

export const GeometricLogo: React.FC = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow" />
      
      {/* Main diamond shape */}
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/20 
                        border-2 border-purple-400 transform rotate-45 backdrop-blur-sm
                        shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 
                        transition-all duration-300 hover:scale-110">
          
          {/* Inner diamond */}
          <div className="absolute inset-4 bg-gradient-to-br from-purple-500/30 to-purple-700/30 
                          border border-purple-300/50 backdrop-blur-sm">
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce" 
             style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-purple-300 rounded-full animate-bounce" 
             style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};