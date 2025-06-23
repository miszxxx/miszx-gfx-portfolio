import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Design } from '../types/Design';
import { CloudinaryImage } from './CloudinaryImage';

interface DesignFormProps {
  design?: Design | null;
  onSubmit: (design: Omit<Design, 'id' | 'createdAt' | 'views'>) => void;
  onCancel: () => void;
}

export const DesignForm: React.FC<DesignFormProps> = ({ design, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (design) {
      setFormData({
        title: design.title,
        description: design.description,
        imageUrl: design.imageUrl,
        tags: [...design.tags]
      });
    }
  }, [design]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900/95 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {design ? 'Edit Design' : 'Add New Design'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                           focus:ring-1 focus:ring-purple-500"
                placeholder="Enter design title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                           focus:ring-1 focus:ring-purple-500 resize-none"
                placeholder="Enter design description"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Cloudinary Public ID
              </label>
              <input
                type="text"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                           focus:ring-1 focus:ring-purple-500"
                placeholder="Enter Cloudinary public ID (e.g., cld-sample-5)"
                required
              />
              <p className="text-sm text-gray-400 mt-1">
                Upload your image to Cloudinary and enter the public ID here
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center space-x-1 px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-purple-300 hover:text-purple-100"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
                             focus:ring-1 focus:ring-purple-500"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image Preview */}
            {formData.imageUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preview
                </label>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <CloudinaryImage 
                    publicId={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={600}
                    height={338}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                {design ? 'Update Design' : 'Add Design'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};