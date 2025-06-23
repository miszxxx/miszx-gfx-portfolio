import React from 'react';
import { X, Calendar, Eye, Download, ExternalLink } from 'lucide-react';
import { Design } from '../types/Design';
import { CloudinaryImage } from './CloudinaryImage';

interface DesignModalProps {
  design: Design;
  onClose: () => void;
}

export const DesignModal: React.FC<DesignModalProps> = ({ design, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900/95 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800/50 rounded-full 
                     text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <CloudinaryImage 
            publicId={design.imageUrl}
            alt={design.title}
            className="w-full h-full object-cover"
            width={800}
            height={450}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{design.title}</h2>
              <p className="text-gray-300 text-lg">{design.description}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {design.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mb-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(design.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>{design.views} views</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <ExternalLink className="h-4 w-4" />
              <span>View Full Size</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};