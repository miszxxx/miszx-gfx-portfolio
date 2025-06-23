import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Design } from '../types/Design';

interface DesignContextType {
  designs: Design[];
  addDesign: (design: Omit<Design, 'id' | 'createdAt' | 'views'>) => void;
  updateDesign: (id: string, design: Omit<Design, 'id' | 'createdAt' | 'views'>) => void;
  deleteDesign: (id: string) => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [designs, setDesigns] = useState<Design[]>([]);

  const addDesign = (designData: Omit<Design, 'id' | 'createdAt' | 'views'>) => {
    const newDesign: Design = {
      ...designData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      views: 0
    };
    setDesigns(prev => [newDesign, ...prev]);
  };

  const updateDesign = (id: string, designData: Omit<Design, 'id' | 'createdAt' | 'views'>) => {
    setDesigns(prev => 
      prev.map(design => 
        design.id === id 
          ? { ...design, ...designData }
          : design
      )
    );
  };

  const deleteDesign = (id: string) => {
    setDesigns(prev => prev.filter(design => design.id !== id));
  };

  return (
    <DesignContext.Provider value={{ designs, addDesign, updateDesign, deleteDesign }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesigns = () => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesigns must be used within a DesignProvider');
  }
  return context;
};