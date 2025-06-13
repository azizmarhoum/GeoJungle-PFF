import React, { useState } from 'react';
import { Plus, Award, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Badge, Achievement } from '../types';
import { mockBadges, mockAchievements } from '../data/mockData';

const BadgesPage: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [activeTab, setActiveTab] = useState<'badges' | 'achievements'>('badges');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Badge | Achievement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: 'bg-blue-500',
    level: 'bronze',
    requirements: '',
    points: 100
  });

  const filteredBadges = badges.filter(badge =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAchievements = achievements.filter(achievement =>
    achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      icon: '',
      color: 'bg-blue-500',
      level: 'bronze',
      requirements: '',
      points: 100
    });
    setShowCreateModal(true);
  };

  const handleEdit = (item: Badge | Achievement) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      icon: item.icon,
      color: item.color,
      level: 'level' in item ? item.level : 'bronze',
      requirements: item.requirements,
      points: 'points' in item ? item.points : 100
    });
    setShowCreateModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'badges') {
      const newBadge: Badge = {
        id: editingItem ? editingItem.id : Date.now().toString(),
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        level: formData.level as 'bronze' | 'silver' | 'gold' | 'platinum',
        requirements: formData.requirements,
        createdDate: editingItem ? (editingItem as Badge).createdDate : new Date().toISOString(),
        isActive: true
      };

      if (editingItem) {
        setBadges(badges.map(b => b.id === editingItem.id ? newBadge : b));
      } else {
        setBadges([...badges, newBadge]);
      }
    } else {
      const newAchievement: Achievement = {
        id: editingItem ? editingItem.id : Date.now().toString(),
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        level: formData.level as 'beginner' | 'intermediate' | 'advanced' | 'expert',
        points: formData.points,
        requirements: formData.requirements,
        createdDate: editingItem ? (editingItem as Achievement).createdDate : new Date().toISOString(),
        isActive: true
      };

      if (editingItem) {
        setAchievements(achievements.map(a => a.id === editingItem.id ? newAchievement : a));
      } else {
        setAchievements([...achievements, newAchievement]);
      }
    }

    setShowCreateModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'badges') {
        setBadges(badges.filter(b => b.id !== id));
      } else {
        setAchievements(achievements.filter(a => a.id !== id));
      }
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': case 'beginner': return 'bg-orange-100 text-orange-800';
      case 'silver': case 'intermediate': return 'bg-gray-100 text-gray-800';
      case 'gold': case 'advanced': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': case 'expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badges & Achievements</h1>
          <p className="text-gray-600 mt-1">Manage rewards and recognition system</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create New {activeTab === 'badges' ? 'Badge' : 'Achievement'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('badges')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'badges'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Badges ({badges.length})
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'achievements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Achievements ({achievements.length})
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'badges' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBadges.map((badge) => (
                <div key={badge.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${badge.color} rounded-lg flex items-center justify-center`}>
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(badge)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(badge.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(badge.level)}`}>
                      {badge.level}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(badge.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${achievement.color} rounded-lg flex items-center justify-center`}>
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(achievement)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(achievement.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(achievement.level)}`}>
                      {achievement.level}
                    </span>
                    <span className="text-sm font-medium text-blue-600">{achievement.points} pts</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(achievement.createdDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingItem ? 'Edit' : 'Create'} {activeTab === 'badges' ? 'Badge' : 'Achievement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {activeTab === 'badges' ? (
                    <>
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </>
                  ) : (
                    <>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </>
                  )}
                </select>
              </div>
              {activeTab === 'achievements' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesPage;