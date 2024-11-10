'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';
import { api } from '@/lib/api';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    phone: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.auth.register(formData);
      
      if (response.success) {
        setToastMessage('Đăng ký thành công! Vui lòng đăng nhập.');
        setShowToast(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">Đăng Ký Tài Khoản</h2>
          <p className="mt-2 text-center text-gray-400">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-primary hover:text-primary-dark">
              Đăng nhập
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Họ và tên
              </label>
              <input
                id="fullName"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                Tên công ty
              </label>
              <input
                id="companyName"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="ml-2 block text-sm">
              Tôi đồng ý với{' '}
              <Link href="/terms" className="text-primary hover:text-primary-dark">
                điều khoản sử dụng
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex justify-center"
          >
            {isLoading ? <LoadingSpinner /> : 'Đăng ký'}
          </button>
        </form>

        {showToast && (
          <Toast
            message={toastMessage}
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
} 