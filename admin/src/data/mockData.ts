import { User, Post, Badge, Achievement, MiniAdmin, GameSession, Community } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'explorer_alex',
    email: 'alex@example.com',
    joinDate: '2023-03-15',
    postCount: 12,
    score: 2450,
    level: 8,
    badges: ['1', '2', '4'],
    achievements: ['1', '3', '5'],
    isMiniAdmin: true,
    communityId: '1',
    posts: [
      { id: '1', title: 'Hidden Gems in Morocco', snippet: 'Discover the secret spots that locals love...', createdDate: '2024-01-15' },
      { id: '2', title: 'Best Street Food in Marrakech', snippet: 'A culinary journey through the medina...', createdDate: '2024-01-10' },
      { id: '3', title: 'Sahara Desert Tips', snippet: 'Essential advice for your desert adventure...', createdDate: '2024-01-05' }
    ]
  },
  {
    id: '2',
    username: 'nomad_sarah',
    email: 'sarah@example.com',
    joinDate: '2023-05-22',
    postCount: 8,
    score: 1890,
    level: 6,
    badges: ['1', '3'],
    achievements: ['1', '2'],
    isMiniAdmin: false,
    posts: [
      { id: '4', title: 'Digital Nomad Life in Canggu', snippet: 'Working remotely from paradise...', createdDate: '2024-01-12' },
      { id: '5', title: 'Bali Rice Terraces Guide', snippet: 'The most stunning terraces to visit...', createdDate: '2024-01-08' }
    ]
  },
  {
    id: '3',
    username: 'adventure_mike',
    email: 'mike@example.com',
    joinDate: '2023-07-10',
    postCount: 15,
    score: 3120,
    level: 10,
    badges: ['1', '2', '3', '4'],
    achievements: ['1', '2', '3', '4'],
    isMiniAdmin: true,
    communityId: '2',
    posts: [
      { id: '6', title: 'Trekking in Nepal', snippet: 'Himalayan adventures and mountain views...', createdDate: '2024-01-14' },
      { id: '7', title: 'Base Camp Journey', snippet: 'The ultimate trekking experience...', createdDate: '2024-01-11' }
    ]
  },
  {
    id: '4',
    username: 'culture_emma',
    email: 'emma@example.com',
    joinDate: '2023-09-03',
    postCount: 6,
    score: 1250,
    level: 4,
    badges: ['1'],
    achievements: ['1'],
    isMiniAdmin: false,
    posts: [
      { id: '8', title: 'Japanese Tea Ceremony', snippet: 'Understanding traditional culture...', createdDate: '2024-01-13' }
    ]
  },
  {
    id: '5',
    username: 'foodie_carlos',
    email: 'carlos@example.com',
    joinDate: '2023-11-18',
    postCount: 20,
    score: 2780,
    level: 9,
    badges: ['1', '2', '3'],
    achievements: ['1', '2', '4'],
    isMiniAdmin: true,
    communityId: '3',
    posts: [
      { id: '9', title: 'Mexican Street Food Tour', snippet: 'Authentic flavors from local vendors...', createdDate: '2024-01-16' }
    ]
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Hidden Gems in Morocco',
    body: 'Morocco is full of incredible hidden spots that most tourists never discover. From secret gardens in Marrakech to untouched beaches along the Atlantic coast, these gems offer authentic experiences away from the crowds. I spent three months exploring the country and found some truly magical places that locals were kind enough to share with me.',
    postType: 'journey',
    authorUsername: 'explorer_alex',
    authorId: '1',
    country: 'Morocco',
    createdDate: '2024-01-15',
    imageUrl: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 124,
    dislikes: 3
  },
  {
    id: '2',
    title: 'Best Street Food in Marrakech',
    body: 'The medina of Marrakech is a food lover\'s paradise. From traditional tagines cooked in clay pots to fresh mint tea served in ornate glasses, every corner offers a new culinary adventure. Here are my top 10 must-try street foods and where to find them.',
    postType: 'tip',
    authorUsername: 'explorer_alex',
    authorId: '1',
    country: 'Morocco',
    createdDate: '2024-01-10',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 89,
    dislikes: 2
  },
  {
    id: '3',
    title: 'Digital Nomad Life in Canggu',
    body: 'Canggu has become one of the world\'s top destinations for digital nomads, and it\'s easy to see why. With reliable internet, affordable co-working spaces, and a vibrant community, it\'s the perfect place to work remotely while living in paradise. Here\'s everything you need to know about setting up your nomad base here.',
    postType: 'experience',
    authorUsername: 'nomad_sarah',
    authorId: '2',
    country: 'Indonesia',
    createdDate: '2024-01-12',
    imageUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 156,
    dislikes: 5
  },
  {
    id: '4',
    title: 'Trekking in Nepal: A Complete Guide',
    body: 'Nepal offers some of the world\'s most spectacular trekking experiences. From the famous Everest Base Camp trek to the stunning Annapurna Circuit, there\'s something for every level of hiker. This guide covers everything from preparation and permits to what to expect on the trail.',
    postType: 'tip',
    authorUsername: 'adventure_mike',
    authorId: '3',
    country: 'Nepal',
    createdDate: '2024-01-14',
    imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 203,
    dislikes: 7
  },
  {
    id: '5',
    title: 'The Art of Japanese Tea Ceremony',
    body: 'The Japanese tea ceremony is much more than just drinking tea - it\'s a spiritual and cultural experience that embodies the principles of harmony, respect, purity, and tranquility. During my month in Kyoto, I had the privilege of learning this ancient art form from a master tea practitioner.',
    postType: 'fact',
    authorUsername: 'culture_emma',
    authorId: '4',
    country: 'Japan',
    createdDate: '2024-01-13',
    imageUrl: 'https://images.pexels.com/photos/5778899/pexels-photo-5778899.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 78,
    dislikes: 1
  },
  {
    id: '6',
    title: 'Mexican Street Food: A Flavor Journey',
    body: 'Mexico\'s street food scene is unparalleled in its diversity and flavor. From tacos al pastor in Mexico City to elote in Guadalajara, each region has its own specialties. Join me on a culinary journey through Mexico\'s most delicious street foods and learn where to find the best vendors.',
    postType: 'journey',
    authorUsername: 'foodie_carlos',
    authorId: '5',
    country: 'Mexico',
    createdDate: '2024-01-16',
    imageUrl: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 167,
    dislikes: 4
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Explorer',
    description: 'Awarded for visiting 5 different countries',
    icon: 'compass',
    color: 'bg-blue-500',
    level: 'bronze',
    requirements: 'Visit 5 different countries',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    name: 'Content Creator',
    description: 'Create 10 high-quality posts',
    icon: 'edit',
    color: 'bg-green-500',
    level: 'silver',
    requirements: 'Create 10 posts with 50+ likes each',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '3',
    name: 'Community Leader',
    description: 'Help and guide other travelers',
    icon: 'users',
    color: 'bg-purple-500',
    level: 'gold',
    requirements: 'Receive 100+ helpful votes on tips',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '4',
    name: 'Adventure Master',
    description: 'Complete extreme adventures',
    icon: 'mountain',
    color: 'bg-red-500',
    level: 'platinum',
    requirements: 'Complete 5 extreme adventure challenges',
    createdDate: '2024-01-01',
    isActive: true
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Welcome to GeoJungle! Complete your first journey.',
    icon: 'footprints',
    color: 'bg-green-400',
    level: 'beginner',
    points: 100,
    requirements: 'Complete profile and make first post',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    name: 'Social Butterfly',
    description: 'Connect with fellow travelers',
    icon: 'heart',
    color: 'bg-pink-400',
    level: 'intermediate',
    points: 250,
    requirements: 'Like 50 posts and comment on 25',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '3',
    name: 'Globe Trotter',
    description: 'Explore the world through posts',
    icon: 'globe',
    color: 'bg-blue-400',
    level: 'advanced',
    points: 500,
    requirements: 'Post about 10 different countries',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '4',
    name: 'Master Explorer',
    description: 'Become a true exploration expert',
    icon: 'crown',
    color: 'bg-yellow-400',
    level: 'expert',
    points: 1000,
    requirements: 'Reach level 10 and earn all badges',
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '5',
    name: 'Cultural Ambassador',
    description: 'Share cultural insights and knowledge',
    icon: 'book',
    color: 'bg-indigo-400',
    level: 'advanced',
    points: 750,
    requirements: 'Create 20 cultural fact posts',
    createdDate: '2024-01-01',
    isActive: true
  }
];

export const mockMiniAdmins: MiniAdmin[] = [
  {
    id: '1',
    userId: '1',
    username: 'explorer_alex',
    email: 'alex@example.com',
    promotedDate: '2024-01-01',
    communityName: 'Morocco Explorers',
    communityDescription: 'A community for travelers passionate about Morocco and North Africa',
    memberCount: 156,
    eventsCreated: 8,
    totalScore: 2450,
    badges: ['1', '2', '4'],
    achievements: ['1', '3', '5'],
    isActive: true
  },
  {
    id: '2',
    userId: '3',
    username: 'adventure_mike',
    email: 'mike@example.com',
    promotedDate: '2024-01-05',
    communityName: 'Mountain Adventures',
    communityDescription: 'For extreme sports and mountain climbing enthusiasts',
    memberCount: 203,
    eventsCreated: 12,
    totalScore: 3120,
    badges: ['1', '2', '3', '4'],
    achievements: ['1', '2', '3', '4'],
    isActive: true
  },
  {
    id: '3',
    userId: '5',
    username: 'foodie_carlos',
    email: 'carlos@example.com',
    promotedDate: '2024-01-10',
    communityName: 'Global Food Hunters',
    communityDescription: 'Discover authentic cuisines and hidden food gems worldwide',
    memberCount: 189,
    eventsCreated: 6,
    totalScore: 2780,
    badges: ['1', '2', '3'],
    achievements: ['1', '2', '4'],
    isActive: true
  }
];

export const mockGameSessions: GameSession[] = [
  {
    id: '1',
    playerId: '1',
    playerUsername: 'explorer_alex',
    gameType: 'quiz',
    gameName: 'Geography Master Quiz',
    score: 850,
    duration: 15,
    completedAt: '2024-01-16T10:30:00Z',
    difficulty: 'hard',
    country: 'Morocco',
    achievements: ['1'],
    badges: ['1']
  },
  {
    id: '2',
    playerId: '3',
    playerUsername: 'adventure_mike',
    gameType: 'challenge',
    gameName: 'Mountain Peak Challenge',
    score: 1200,
    duration: 45,
    completedAt: '2024-01-16T09:15:00Z',
    difficulty: 'expert',
    country: 'Nepal',
    achievements: ['3', '4'],
    badges: ['2', '4']
  },
  {
    id: '3',
    playerId: '2',
    playerUsername: 'nomad_sarah',
    gameType: 'exploration',
    gameName: 'Digital Nomad Explorer',
    score: 650,
    duration: 25,
    completedAt: '2024-01-16T08:45:00Z',
    difficulty: 'medium',
    country: 'Indonesia',
    achievements: ['1', '2'],
    badges: ['1']
  },
  {
    id: '4',
    playerId: '5',
    playerUsername: 'foodie_carlos',
    gameType: 'tournament',
    gameName: 'Global Cuisine Tournament',
    score: 950,
    duration: 35,
    completedAt: '2024-01-15T19:20:00Z',
    difficulty: 'hard',
    country: 'Mexico',
    achievements: ['2', '5'],
    badges: ['2', '3']
  },
  {
    id: '5',
    playerId: '4',
    playerUsername: 'culture_emma',
    gameType: 'quiz',
    gameName: 'Cultural Heritage Quiz',
    score: 720,
    duration: 20,
    completedAt: '2024-01-15T16:10:00Z',
    difficulty: 'medium',
    country: 'Japan',
    achievements: ['1', '5'],
    badges: ['1']
  }
];

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Morocco Explorers',
    description: 'A community for travelers passionate about Morocco and North Africa',
    adminId: '1',
    adminUsername: 'explorer_alex',
    memberCount: 156,
    createdDate: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    name: 'Mountain Adventures',
    description: 'For extreme sports and mountain climbing enthusiasts',
    adminId: '3',
    adminUsername: 'adventure_mike',
    memberCount: 203,
    createdDate: '2024-01-05',
    isActive: true
  },
  {
    id: '3',
    name: 'Global Food Hunters',
    description: 'Discover authentic cuisines and hidden food gems worldwide',
    adminId: '5',
    adminUsername: 'foodie_carlos',
    memberCount: 189,
    createdDate: '2024-01-10',
    isActive: true
  }
];