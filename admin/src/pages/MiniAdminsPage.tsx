import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Calendar, Award, Search, Eye, UserMinus, Crown } from 'lucide-react';
import { MiniAdmin } from '../types';
import { mockMiniAdmins } from '../data/mockData';

const MiniAdminsPage: React.FC = () => {
  const [miniAdmins, setMiniAdmins] = useState<MiniAdmin[]>(mockMiniAdmins);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMiniAdmins = miniAdmins.filter(admin =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.communityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRevokeMiniAdmin = (adminId: string) => {
    if (confirm('Are you sure you want to revoke mini admin privileges? This will also deactivate their community.')) {
      setMiniAdmins(miniAdmins.map(admin => 
        admin.id === adminId ? { ...admin, isActive: false } : admin
      ));
    }
  };

  const totalCommunities = miniAdmins.filter(admin => admin.isActive).length;
  const totalMembers = miniAdmins.reduce((sum, admin) => sum + admin.memberCount, 0);
  const totalEvents = miniAdmins.reduce((sum, admin) => sum + admin.eventsCreated, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mini Admin Management</h1>
          <p className="text-gray-600 mt-1">Manage community leaders and their privileges</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-purple-600" />
          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {filteredMiniAdmins.filter(admin => admin.isActive).length} active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Mini Admins</p>
              <p className="text-2xl font-bold text-gray-900">{miniAdmins.filter(admin => admin.isActive).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Communities</p>
              <p className="text-2xl font-bold text-gray-900">{totalCommunities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Community Members</p>
              <p className="text-2xl font-bold text-gray-900">{totalMembers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Events Created</p>
              <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search mini admins by username, email, or community name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mini Admins Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMiniAdmins.map((admin) => (
          <div key={admin.id} className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${!admin.isActive ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{admin.username}</h3>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                  {!admin.isActive && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/users/${admin.userId}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="View user details"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                {admin.isActive && (
                  <button
                    onClick={() => handleRevokeMiniAdmin(admin.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Revoke mini admin privileges"
                  >
                    <UserMinus className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{admin.communityName}</h4>
                <p className="text-sm text-gray-600">{admin.communityDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{admin.memberCount}</div>
                  <div className="text-xs text-gray-600">Members</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{admin.eventsCreated}</div>
                  <div className="text-xs text-gray-600">Events</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600">{admin.totalScore} pts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">{admin.badges.length} badges</span>
                  </div>
                </div>
                <span className="text-gray-500">
                  Since {new Date(admin.promotedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMiniAdmins.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No mini admins found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MiniAdminsPage;