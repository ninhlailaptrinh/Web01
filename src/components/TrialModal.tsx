'use client';

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Toast from './Toast';

interface TrialModalProps {
  onClose: () => void;
}

export default function TrialModal({ onClose }: TrialModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'basic' // basic, premium, enterprise
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowToast(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 relative animate-slideIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Dùng thử miễn phí</h2>
          <p className="text-gray-400">
            Trải nghiệm dịch vụ của chúng tôi trong 14 ngày mà không mất phí
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Họ và tên</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Số điện thoại</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tên công ty</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gói dịch vụ</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="basic">Website Development Basic</option>
              <option value="premium">E-commerce Premium</option>
              <option value="enterprise">Enterprise Solution</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary mt-6"
          >
            {isLoading ? <LoadingSpinner /> : 'Đăng ký dùng thử'}
          </button>
        </form>

        {showToast && (
          <Toast
            message="Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm."
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
} 