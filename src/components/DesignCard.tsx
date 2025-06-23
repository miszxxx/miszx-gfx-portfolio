import React from 'react';
import { Calendar, Eye } from 'lucide-react';
import { Design } from '../types/Design';
import { CloudinaryImage } from './CloudinaryImage';

interface DesignCardProps {
  design: Design;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, viewMode, onClick }) => {
  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 
                   transition-all duration-300 cursor-pointer backdrop-blur-sm hover:bg-gray-800/70"
      >
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <CloudinaryImage 
              publicId={design.imageUrl}
              alt={design.title}
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{design.title}</h3>
            <p className="text-gray-400 mb-3 line-clamp-2">{design.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(design.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{design.views} views</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {design.tags.slice(0, 2).map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {design.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">
                    +{design.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden 
                 hover:border-purple-500/50 transition-all duration-300 cursor-pointer 
                 backdrop-blur-sm hover:transform hover:scale-105 hover:shadow-2xl 
                 hover:shadow-purple-500/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <CloudinaryImage 
          publicId={design.imageUrl}
          alt={design.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          width={400}
          height={225}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Tags overlay */}
        <div className="absolute bottom-3 right-3 flex flex-wrap gap-1 justify-end">
          {design.tags.slice(0, 2).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
          {design.tags.length > 2 && (
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
              +{design.tags.length - 2}
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 
                       transition-colors">{design.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{design.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(design.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{design.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};