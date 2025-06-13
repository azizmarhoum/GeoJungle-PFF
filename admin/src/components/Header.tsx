import React from 'react';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">GeoJungle</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-600 font-medium">Admin Panel</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Hello, Abdelaziz Marhoum 👋 — Welcome to your GeoJungle Admin Panel
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;