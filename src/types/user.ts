export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
  status: 'active' | 'pending' | 'blocked';
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  companyName: string;
  phone: string;
}

// Thêm interface cho admin
export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
} 