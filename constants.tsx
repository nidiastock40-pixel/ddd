
import { Service } from './types';

export const SERVICES: Service[] = [
  // Instagram
  {
    id: '1',
    category: 'Instagram',
    type: 'Followers',
    name: 'Instagram Followers [Real & Active]',
    ratePer1000: 2.50,
    min: 100,
    max: 50000,
    description: 'High quality followers with profile pictures and posts. Low drop rate.',
    estimatedTime: '1-6 Hours'
  },
  {
    id: '2',
    category: 'Instagram',
    type: 'Likes',
    name: 'Instagram Likes [Fast Speed]',
    ratePer1000: 0.80,
    min: 50,
    max: 100000,
    description: 'Instant start. High speed delivery.',
    estimatedTime: '5-30 Minutes'
  },
  {
    id: '7',
    category: 'Instagram',
    type: 'Views',
    name: 'Instagram Reels Views [Viral Boost]',
    ratePer1000: 0.05,
    min: 1000,
    max: 10000000,
    description: 'Instant views to boost your reels algorithm reach.',
    estimatedTime: 'Instant'
  },
  // TikTok
  {
    id: '3',
    category: 'TikTok',
    type: 'Views',
    name: 'TikTok Views [High Retention]',
    ratePer1000: 0.15,
    min: 500,
    max: 1000000,
    description: 'Boost your TikTok reach with high retention views.',
    estimatedTime: 'Instant'
  },
  {
    id: '4',
    category: 'TikTok',
    type: 'Followers',
    name: 'TikTok Followers [Premium]',
    ratePer1000: 3.20,
    min: 100,
    max: 20000,
    description: 'Organic-looking followers from worldwide locations.',
    estimatedTime: '2-12 Hours'
  },
  {
    id: '8',
    category: 'TikTok',
    type: 'Likes',
    name: 'TikTok Likes [Stable]',
    ratePer1000: 1.10,
    min: 100,
    max: 50000,
    description: 'Permanent likes for your TikTok videos.',
    estimatedTime: '1 Hour'
  },
  // YouTube
  {
    id: '5',
    category: 'YouTube',
    type: 'Followers',
    name: 'YouTube Subscribers [Non-Drop]',
    ratePer1000: 15.00,
    min: 50,
    max: 10000,
    description: 'Subscribers with 30-day refill guarantee.',
    estimatedTime: '1-3 Days'
  },
  {
    id: '9',
    category: 'YouTube',
    type: 'Views',
    name: 'YouTube Views [Ads Quality]',
    ratePer1000: 4.50,
    min: 500,
    max: 500000,
    description: 'Safe, high-quality views for monetization safety.',
    estimatedTime: '12 Hours'
  },
  // X (Twitter)
  {
    id: '6',
    category: 'X',
    type: 'Followers',
    name: 'X Followers [Verified Quality]',
    ratePer1000: 5.50,
    min: 100,
    max: 5000,
    description: 'High quality X followers to boost your social proof.',
    estimatedTime: '12-24 Hours'
  },
  {
    id: '10',
    category: 'X',
    type: 'Likes',
    name: 'X Likes [Instant]',
    ratePer1000: 1.80,
    min: 50,
    max: 10000,
    description: 'Get instant likes on your posts.',
    estimatedTime: '5 Minutes'
  },
  // Telegram
  {
    id: '11',
    category: 'Telegram',
    type: 'Followers',
    name: 'Telegram Channel Members [Premium]',
    ratePer1000: 1.50,
    min: 100,
    max: 100000,
    description: 'High quality members for your channel or group.',
    estimatedTime: '1 Hour'
  }
];

export const CATEGORIES = Array.from(new Set(SERVICES.map(s => s.category)));
