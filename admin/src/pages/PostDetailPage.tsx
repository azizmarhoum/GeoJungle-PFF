import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Calendar, Heart, ThumbsDown, Tag, AlertTriangle } from 'lucide-react';
import { mockPosts } from '../data/mockData';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = mockPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
        <Link
          to="/posts"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
        </Link>
      </div>
    );
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'fact': return 'bg-blue-100 text-blue-800';
      case 'journey': return 'bg-green-100 text-green-800';
      case 'tip': return 'bg-orange-100 text-orange-800';
      case 'experience': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/posts')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post Details</h1>
            <p className="text-gray-600">View and manage post information</p>
          </div>
        </div>
        {post.isDeleted && (
          <div className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-800 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Deleted Post</span>
          </div>
        )}
      </div>

      {/* Deletion Notice */}
      {post.isDeleted && post.deletionReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-900">Post Deleted</h3>
              <p className="text-red-700 mt-1">{post.deletionReason}</p>
              <div className="text-sm text-red-600 mt-2">
                Deleted by {post.deletedBy} on {post.deletedAt ? new Date(post.deletedAt).toLocaleDateString() : 'Unknown date'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Post Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPostTypeColor(post.postType)}`}>
              <Tag className="h-3 w-3 inline mr-1" />
              {post.postType}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-red-500" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsDown className="h-4 w-4 text-gray-400" />
                <span>{post.dislikes}</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <Link 
                to={`/users/${post.authorId}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.authorUsername}
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{post.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.createdDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Post Image */}
        {post.imageUrl && (
          <div className="px-6 pt-6">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Post Body */}
        <div className="p-6">
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {post.body}
            </div>
          </div>
        </div>

        {/* Post Stats */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{post.likes}</div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500">{post.dislikes}</div>
              <div className="text-sm text-gray-600">Dislikes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {((post.likes / (post.likes + post.dislikes)) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;