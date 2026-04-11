import { Timestamp } from 'firebase/firestore';

export type Role = 'client' | 'admin';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: Role;
  createdAt: Timestamp;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  categoryId: string;
  stock: number;
  active: boolean;
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  order: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  details?: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'transfer' | 'cash';
  shippingAddress?: Address;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Appointment {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  calendarEventId?: string;
  createdAt: Timestamp;
}
