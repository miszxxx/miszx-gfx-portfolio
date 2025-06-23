import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { DesignsPage } from './pages/DesignsPage';
import { AdminPage } from './pages/AdminPage';
import { DesignProvider } from './context/DesignContext';

function App() {
  return (
    <DesignProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/designs" element={<DesignsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </DesignProvider>
  );
}

export default App;