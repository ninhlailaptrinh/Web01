'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  status: 'active' | 'pending' | 'expired';
  startDate?: string;
  endDate?: string;
  technicalDetails: string[];
  supportInfo: {
    email: string;
    phone: string;
    hours: string;
  };
  usage: {
    current: number;
    limit: number;
    unit: string;
  };
}

export default function ServiceDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setService({
          id: params.id,
          name: 'Website Development Basic',
          description: 'Gói phát triển website cơ bản cho doanh nghiệp',
          price: 9900000,
          duration: '3 tháng',
          features: [
            'Thiết kế responsive',
            'SEO cơ bản',
            'Hosting 1 năm',
            'Hỗ trợ kỹ thuật'
          ],
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-04-01',
          technicalDetails: [
            'PHP 8.1',
            'MySQL Database',
            'SSL Certificate',
            'Daily Backup',
            'CDN Integration',
            'Web Analytics'
          ],
          supportInfo: {
            email: 'support@techvn.com',
            phone: '(84) 123-456-789',
            hours: '24/7'
          },
          usage: {
            current: 45,
            limit: 100,
            unit: 'GB'
          }
        });
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetail();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!service) {
    return <div>Không tìm thấy thông tin dịch vụ</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
            <p className="text-gray-400">{service.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-sm font-medium mb-2
              ${service.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                service.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                'bg-red-500/10 text-red-500'}`}>
              {service.status === 'active' ? 'Đang hoạt động' : 
               service.status === 'pending' ? 'Đang xử lý' : 'Hết hạn'}
            </span>
            <span className="text-2xl font-bold text-primary">
              {service.price.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Period */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-6">Thời gian sử dụng</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Ngày bắt đầu</p>
                <p className="font-medium text-lg">{new Date(service.startDate!).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Ngày kết thúc</p>
                <p className="font-medium text-lg">{new Date(service.endDate!).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-6">Thông số kỹ thuật</h2>
            <div className="grid grid-cols-2 gap-4">
              {service.technicalDetails.map((detail, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-6 flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-200">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-6">Thống kê sử dụng</h2>
            <div className="bg-gray-900/50 rounded-lg p-6 space-y-6">
              {/* Dung lượng */}
              <div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-400">Dung lượng sử dụng</span>
                  <span className="font-medium">{service.usage.current}/{service.usage.limit} {service.usage.unit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-primary rounded-full h-2.5 transition-all duration-300"
                    style={{ width: `${(service.usage.current / service.usage.limit) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Còn lại {service.usage.limit - service.usage.current} {service.usage.unit}
                </p>
              </div>

              {/* Thông tin bổ sung */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Băng thông</p>
                  <p className="font-medium">Không giới hạn</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Tốc độ</p>
                  <p className="font-medium">100 Mbps</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Support Info */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-6">Thông tin hỗ trợ</h2>
            <div className="space-y-4">
              {Object.entries(service.supportInfo).map(([key, value], index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {key === 'email' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                      {key === 'phone' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      )}
                      {key === 'hours' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                    <p className="text-gray-400 text-sm capitalize">{key}</p>
                  </div>
                  <p className="font-medium text-lg">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-6">Thao tác</h2>
            <div className="bg-gray-900/50 rounded-lg p-6 space-y-6">
              {/* Trạng thái */}
              <div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-400">Trạng thái dịch vụ</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${service.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                      service.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-red-500/10 text-red-500'}`}>
                    {service.status === 'active' ? 'Đang hoạt động' : 
                     service.status === 'pending' ? 'Đang xử lý' : 'Hết hạn'}
                  </span>
                </div>
              </div>

              {/* Thời gian */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Ngày hết hạn</p>
                  <p className="font-medium">{new Date(service.endDate!).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Thời gian còn lại</p>
                  <p className="font-medium">30 ngày</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button className="w-full btn-primary py-4">
                  Gia hạn dịch vụ
                </button>
                <button className="w-full btn-secondary py-4">
                  Yêu cầu hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 