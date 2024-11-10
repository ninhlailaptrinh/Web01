'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrialModal from '@/components/TrialModal';

export default function Home() {
  const [showTrialModal, setShowTrialModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Xây Dựng Tương Lai Số <br/>
              <span className="text-accent">Cùng Chúng Tôi</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Chúng tôi cung cấp giải pháp công nghệ toàn diện giúp doanh nghiệp của bạn phát triển trong kỷ nguyên số.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setShowTrialModal(true)}
                className="btn-primary"
              >
                Dùng thử miễn phí
              </button>
              <Link href="/contact" className="btn-secondary">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clients */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Được tin dùng bởi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            {['client1.png', 'client2.png', 'client3.png', 'client4.png'].map((logo, index) => (
              <div key={index} className="h-12 w-32 bg-gray-800/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn sàng nâng cấp doanh nghiệp?</h2>
          <p className="text-xl mb-8">
            Hãy để chúng tôi giúp bạn đạt được mục tiêu kinh doanh
          </p>
          <Link href="/contact" className="btn-secondary">
            Liên hệ ngay
          </Link>
        </div>
      </section>

      {/* Trial Modal */}
      {showTrialModal && (
        <TrialModal onClose={() => setShowTrialModal(false)} />
      )}

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tính Năng Nổi Bật</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Chúng tôi cung cấp các giải pháp công nghệ tiên tiến giúp doanh nghiệp của bạn 
              phát triển nhanh chóng và bền vững trong kỷ nguyên số.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl bg-gray-800/50 backdrop-blur-lg shadow-lg 
                hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const stats = [
  { value: '1000+', label: 'Khách hàng' },
  { value: '50+', label: 'Quốc gia' },
  { value: '95%', label: 'Hài lòng' },
  { value: '24/7', label: 'Hỗ trợ' }
];
const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
        />
      </svg>
    ),
    title: "AI & Machine Learning",
    description: "Tích hợp trí tuệ nhân tạo vào quy trình kinh doanh",
    benefits: [
      "Tự động hóa quy trình làm việc",
      "Phân tích dữ liệu thông minh",
      "Dự đoán xu hướng thị trường",
      "Tối ưu hóa trải nghiệm khách hàng",
      "Giảm thiểu chi phí vận hành"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
        />
      </svg>
    ),
    title: "Bảo Mật Đa Lớp",
    description: "Hệ thống bảo mật toàn diện với nhiều lớp bảo vệ",
    benefits: [
      "Mã hóa dữ liệu đầu cuối",
      "Xác thực đa yếu tố",
      "Firewall thông minh",
      "Giám sát 24/7",
      "Backup tự động định kỳ"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M13 10V3L4 14h7v7l9-11h-7z" 
        />
      </svg>
    ),
    title: "Hiệu Suất Tối Ưu",
    description: "Tối ưu hóa hiệu suất với công nghệ điện toán đám mây",
    benefits: [
      "Auto-scaling theo nhu cầu",
      "Load balancing thông minh",
      "CDN toàn cầu",
      "Cache thông minh",
      "Tối ưu hóa database"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
        />
      </svg>
    ),
    title: "Analytics & Reports",
    description: "Phân tích dữ liệu chuyên sâu với báo cáo chi tiết",
    benefits: [
      "Dashboard trực quan",
      "Báo cáo tùy chỉnh",
      "Phân tích real-time",
      "Export đa định dạng",
      "Cảnh báo thông minh"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" 
        />
      </svg>
    ),
    title: "Hỗ Trợ 24/7",
    description: "Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng 24/7",
    benefits: [
      "Live chat hỗ trợ",
      "Hotline 24/7",
      "Email support",
      "Tài liệu hướng dẫn",
      "Video tutorial"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" 
        />
      </svg>
    ),
    title: "Tích Hợp Đa Nền Tảng",
    description: "Tích hợp liền mạch với các nền tảng phổ biến",
    benefits: [
      "API RESTful",
      "Webhook tùy chỉnh",
      "SSO integration",
      "Mobile SDK",
      "Third-party plugins"
    ]
  }
];

