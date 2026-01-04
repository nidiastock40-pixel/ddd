
export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  niche?: string;
  balance: number;
  totalSpent: number;
  totalOrders: number;
  joinedDate: string;
}

export type SocialPlatform = 'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'Facebook' | 'Telegram';

export interface Service {
  id: string;
  category: SocialPlatform;
  type: 'Followers' | 'Likes' | 'Views' | 'Comments' | 'Shares';
  name: string;
  ratePer1000: number;
  min: number;
  max: number;
  description: string;
  estimatedTime: string;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  link: string;
  quantity: number;
  charge: number;
  status: OrderStatus;
  date: string;
  userName?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  method: string;
  status: 'Success' | 'Pending' | 'Failed';
  utr: string;
  date: string;
}
