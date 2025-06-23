import React, { useState } from 'react';
import { Lock, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useDesigns } from '../context/DesignContext';
import { AdminLogin } from '../components/AdminLogin';
import { DesignForm } from '../components/DesignForm';
import { CloudinaryImage } from '../components/CloudinaryImage';
import { Design } from '../types/Design';

export const AdminPage: React.FC = () => {
  const { designs, addDesign, updateDesign, deleteDesign } = useDesigns();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const handleAddDesign = (designData: Omit<Design, 'id' | 'createdAt' | 'views'>) => {
    addDesign(designData);
    setShowForm(false);
  };

  const handleUpdateDesign = (designData: Omit<Design, 'id' | 'createdAt' | 'views'>) => {
    if (editingDesign) {
      updateDesign(editingDesign.id, designData);
      setEditingDesign(null);
    }
  };

  const handleEdit = (design: Design) => {
    setEditingDesign(design);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      deleteDesign(id);
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your design portfolio</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span>Logout</span>
            </button>
            
            <button
              onClick={() => {
                setEditingDesign(null);
                setShowForm(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Design</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Total Designs</h3>
            <p className="text-3xl font-bold text-purple-400">{designs.length}</p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-purple-400">
              {designs.reduce((sum, design) => sum + design.views, 0)}
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Average Views</h3>
            <p className="text-3xl font-bold text-purple-400">
              {designs.length > 0 ? Math.round(designs.reduce((sum, design) => sum + design.views, 0) / designs.length) : 0}
            </p>
          </div>
        </div>

        {/* Designs Table */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Designs</h2>
          </div>
          
          {designs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No designs yet. Add your first design to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Design</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {designs.map((design) => (
                    <tr key={design.id} className="hover:bg-gray-900/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <CloudinaryImage 
                            publicId={design.imageUrl}
                            alt={design.title}
                            className="w-full h-full object-cover"
                            width={64}
                            height={64}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{design.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">{design.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {design.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                          {design.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">
                              +{design.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{design.views}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(design.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(design)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(design.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Design Form Modal */}
        {showForm && (
          <DesignForm
            design={editingDesign}
            onSubmit={editingDesign ? handleUpdateDesign : handleAddDesign}
            onCancel={() => {
              setShowForm(false);
              setEditingDesign(null);
            }}
          />
        )}
      </div>
    </div>
  );
};