import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, FileText, Award, Shield, Gamepad2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard', count: null },
    { to: '/users', icon: Users, label: 'Users', count: null },
    { to: '/posts', icon: FileText, label: 'Posts', count: null },
    { to: '/badges', icon: Award, label: 'Badges & Achievements', count: null },
    { to: '/mini-admins', icon: Shield, label: 'Mini Admins', count: null },
    { to: '/games', icon: Gamepad2, label: 'Game Analytics', count: null },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;