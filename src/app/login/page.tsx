'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { api } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Đang đăng nhập với:', formData); // Debug log
      const response = await api.auth.login(formData.email, formData.password);
      console.log('Phản hồi từ server:', response); // Debug log
      
      if (response.success) {
        // Lưu thông tin user
        localStorage.setItem('auth_token', 'mock_token');
        localStorage.setItem('user_name', response.user.name);
        localStorage.setItem('user_role', response.user.role);
        
        // Chuyển hướng đến dashboard
        router.push('/user/dashboard');
      } else {
        setError(response.message || 'Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err); // Debug log
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">Đăng nhập</h2>
          <p className="mt-2 text-center text-gray-400">
            Hoặc{' '}
            <Link href="/register" className="text-primary hover:text-primary-dark">
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="text-primary hover:text-primary-dark">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex justify-center"
          >
            {isLoading ? <LoadingSpinner /> : 'Đăng nhập'}
          </button>
        </form>

        {/* Debug Info - Chỉ hiển thị trong development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Tài khoản test:</p>
            <p className="text-sm">Email: test@gmail.com</p>
            <p className="text-sm">Password: 123456</p>
          </div>
        )}
      </div>
    </div>
  );
} 