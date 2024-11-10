'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';
import PaymentModal from '@/components/PaymentModal';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  status: 'active' | 'pending' | 'expired';
}

export default function UserDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeServices, setActiveServices] = useState<Service[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([
    {
      id: '1',
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
      status: 'active'
    },
    {
      id: '2',
      name: 'E-commerce Premium',
      description: 'Giải pháp thương mại điện tử toàn diện',
      price: 29900000,
      duration: '6 tháng',
      features: [
        'Website bán hàng full tính năng',
        'Tích hợp thanh toán',
        'Quản lý kho hàng',
        'App mobile native',
        'Hỗ trợ 24/7'
      ],
      status: 'pending'
    },
    // Thêm các gói dịch vụ khác...
  ]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [showDetails, setShowDetails] = useState<{[key: string]: boolean}>({});
  const [activeTab, setActiveTab] = useState('services');

  const toggleDetails = (serviceId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  useEffect(() => {
    // Kiểm tra đăng nhập khi component mount
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  const handleServiceSubscribe = async (serviceId: string) => {
    const service = availableServices.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedService) {
      // Thêm service vào danh sách active
      setActiveServices(prev => [...prev, {...selectedService, status: 'pending'}]);
      // Xóa khỏi available services
      setAvailableServices(prev => prev.filter(s => s.id !== selectedService.id));
      // Hiển thị thông báo
      setToastMessage('Đăng ký dịch vụ thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
      setShowToast(true);
      // Đóng modal
      setSelectedService(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // hoặc có thể return một component "Unauthorized"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tabs Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-800/50 backdrop-blur-lg rounded-lg p-1">
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 ${
            activeTab === 'services' 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-700/50 text-gray-400'
          }`}
        >
          Dịch vụ
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 ${
            activeTab === 'billing' 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-700/50 text-gray-400'
          }`}
        >
          Thanh toán
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 ${
            activeTab === 'support' 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-700/50 text-gray-400'
          }`}
        >
          Hỗ trợ
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 ${
            activeTab === 'settings' 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-700/50 text-gray-400'
          }`}
        >
          Cài đặt
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'services' && (
        <>
          {/* Services content - giữ nguyên phần cũ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Dịch vụ đang sử dụng</h2>
            {activeServices.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
                <p className="text-gray-400">Bạn chưa đăng ký dịch vụ nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeServices.map((service) => (
                  <div key={service.id} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold">{service.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${service.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                          service.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                          'bg-red-500/10 text-red-500'}`}>
                        {service.status === 'active' ? 'Đang hoạt động' : 
                         service.status === 'pending' ? 'Đang xử lý' : 'Hết hạn'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">{service.description}</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Thời hạn:</span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                      <button 
                        onClick={() => router.push(`/user/services/${service.id}`)} 
                        className="w-full btn-primary"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Dịch vụ có thể thuê</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableServices.map((service) => (
                <div key={service.id} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <div 
                      className={`transition-all duration-300 overflow-hidden ${
                        showDetails[service.id] ? 'max-h-40' : 'max-h-0'
                      }`}
                    >
                      <p className="text-gray-400 text-sm">{service.description}</p>
                      <ul className="space-y-3 mt-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-2xl font-bold">
                          {service.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                          /{service.duration}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleDetails(service.id)}
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        {showDetails[service.id] ? 'Ẩn bớt' : 'Xem thêm'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleServiceSubscribe(service.id)}
                      disabled={isLoading}
                      className="w-full btn-primary py-4"
                    >
                      {isLoading ? <LoadingSpinner /> : 'Đăng ký ngay'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-8">
          {/* Billing Overview */}
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Tổng quan thanh toán</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-2">Tổng chi phí tháng này</p>
                <p className="text-2xl font-bold text-primary">39.800.000đ</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-2">Hóa đơn chưa thanh toán</p>
                <p className="text-2xl font-bold text-yellow-500">1</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-2">Ngày thanh toán tiếp theo</p>
                <p className="text-2xl font-bold">15/03/2024</p>
              </div>
            </div>
          </section>

          {/* Payment History */}
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Lịch sử thanh toán</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="pb-4">Mã hóa đơn</th>
                    <th className="pb-4">Ngày</th>
                    <th className="pb-4">Dịch vụ</th>
                    <th className="pb-4">Số tiền</th>
                    <th className="pb-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[1, 2, 3].map((_, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-4">#INV-{2024001 + index}</td>
                      <td className="py-4">{`${index + 1}/3/2024`}</td>
                      <td className="py-4">Website Development Basic</td>
                      <td className="py-4">9.900.000đ</td>
                      <td className="py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          Đã thanh toán
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="space-y-8">
          {/* Support Tickets */}
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Yêu cầu hỗ trợ</h2>
              <button className="btn-primary">Tạo yêu cầu mới</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium mb-1">Vấn đề kết nối database</h3>
                      <p className="text-sm text-gray-400">Ticket #{2024001 + index}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                      Đang xử lý
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Không thể kết nối đến database sau khi cập nhật phiên bản mới...
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Cập nhật: 2 giờ trước</span>
                    <button className="text-primary hover:text-primary-dark">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-6">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-8">
          {/* Profile Settings */}
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Họ và tên</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue="0123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Công ty</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue="TechVN"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary">
                Lưu thay đổi
              </button>
            </form>
          </section>

          {/* Security Settings */}
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Bảo mật</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button className="btn-primary">
                Đổi mật khẩu
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Payment Modal */}
      {selectedService && (
        <PaymentModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes('thành công') ? 'success' : 'error'}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

const faqs = [
  {
    question: "Làm thế nào để bắt đầu sử dụng dịch vụ?",
    answer: "Sau khi đăng ký và thanh toán, bạn sẽ nhận được email hướng dẫn chi tiết các bước tiếp theo."
  },
  {
    question: "Tôi có thể nâng cấp gói dịch vụ không?",
    answer: "Có, bạn có thể nâng cấp gói dịch vụ bất kỳ lúc nào trong phần quản lý dịch vụ."
  },
  {
    question: "Làm thế nào để liên hệ hỗ trợ kỹ thuật?",
    answer: "Bạn có thể tạo ticket hỗ trợ mới hoặc liên hệ trực tiếp qua hotline 24/7."
  }
]; 