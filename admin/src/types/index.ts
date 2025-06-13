export interface User {
  id: string;
  username: string;
  email: string;
  joinDate: string;
  postCount: number;
  posts: UserPost[];
  score: number;
  level: number;
  badges: string[];
  achievements: string[];
  isMiniAdmin: boolean;
  communityId?: string;
}

export interface UserPost {
  id: string;
  title: string;
  snippet: string;
  createdDate: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  postType: 'fact' | 'journey' | 'tip' | 'experience';
  authorUsername: string;
  authorId: string;
  country: string;
  createdDate: string;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  isDeleted?: boolean;
  deletionReason?: string;
  deletedBy?: string;
  deletedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirements: string;
  createdDate: string;
  isActive: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  points: number;
  requirements: string;
  createdDate: string;
  isActive: boolean;
}

export interface MiniAdmin {
  id: string;
  userId: string;
  username: string;
  email: string;
  promotedDate: string;
  communityName: string;
  communityDescription: string;
  memberCount: number;
  eventsCreated: number;
  totalScore: number;
  badges: string[];
  achievements: string[];
  isActive: boolean;
}

export interface GameSession {
  id: string;
  playerId: string;
  playerUsername: string;
  gameType: 'quiz' | 'exploration' | 'challenge' | 'tournament';
  gameName: string;
  score: number;
  duration: number; // in minutes
  completedAt: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  country?: string;
  achievements: string[];
  badges: string[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  adminId: string;
  adminUsername: string;
  memberCount: number;
  createdDate: string;
  isActive: boolean;
}