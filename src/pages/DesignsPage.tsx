import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useDesigns } from '../context/DesignContext';
import { DesignCard } from '../components/DesignCard';
import { DesignModal } from '../components/DesignModal';
import { Design } from '../types/Design';

export const DesignsPage: React.FC = () => {
  const { designs } = useDesigns();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  // Get unique tags
  const allTags = [...new Set(designs.flatMap(design => design.tags))];

  // Filter designs
  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || design.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Design <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our collection of premium graphics, logos, and motion designs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                         focus:ring-1 focus:ring-purple-500 backdrop-blur-sm"
            />
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-purple-500 
                           focus:ring-1 focus:ring-purple-500 backdrop-blur-sm appearance-none"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Designs Grid */}
        {filteredDesigns.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredDesigns.map(design => (
              <DesignCard
                key={design.id}
                design={design}
                viewMode={viewMode}
                onClick={() => setSelectedDesign(design)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {designs.length === 0 ? 'No designs yet' : 'No designs found'}
            </h3>
            <p className="text-gray-400">
              {designs.length === 0 
                ? 'Add your first design in the admin panel to get started'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        )}

        {/* Design Modal */}
        {selectedDesign && (
          <DesignModal
            design={selectedDesign}
            onClose={() => setSelectedDesign(null)}
          />
        )}
      </div>
    </div>
  );
};