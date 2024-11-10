export default function Services() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Dịch Vụ Của Chúng Tôi
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Chúng tôi cung cấp đầy đủ các giải pháp công nghệ để giúp doanh nghiệp của bạn
            phát triển trong thời đại số.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sẵn sàng nâng cấp doanh nghiệp của bạn?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn giải pháp phù hợp nhất
            cho doanh nghiệp của bạn.
          </p>
          <button className="btn-primary">
            Liên Hệ Tư Vấn
          </button>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
        />
      </svg>
    ),
    title: "Phát Triển Website",
    description: "Thiết kế và phát triển website chuyên nghiệp, tối ưu trải nghiệm người dùng.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "High Performance",
      "Security Protection"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
        />
      </svg>
    ),
    title: "Phát Triển Ứng Dụng Di Động",
    description: "Xây dựng ứng dụng di động đa nền tảng với công nghệ hiện đại.",
    features: [
      "iOS & Android",
      "Native Performance",
      "Offline Support",
      "Push Notifications"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
        />
      </svg>
    ),
    title: "Tư Vấn Giải Pháp",
    description: "Tư vấn và đề xuất giải pháp công nghệ phù hợp cho doanh nghiệp.",
    features: [
      "Phân Tích Yêu Cầu",
      "Đề Xuất Giải Pháp",
      "Tối Ưu Chi Phí",
      "Hỗ Trợ Triển Khai"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
        />
      </svg>
    ),
    title: "Digital Marketing",
    description: "Chiến lược marketing số toàn diện cho doanh nghiệp.",
    features: [
      "SEO/SEM",
      "Social Media",
      "Content Marketing",
      "Analytics & Reports"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
        />
      </svg>
    ),
    title: "Cloud Solutions",
    description: "Giải pháp đám mây và hạ tầng công nghệ thông tin.",
    features: [
      "Cloud Migration",
      "Server Management",
      "Backup Solutions",
      "24/7 Support"
    ]
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
        />
      </svg>
    ),
    title: "Bảo Mật & An Ninh",
    description: "Giải pháp bảo mật toàn diện cho hệ thống công nghệ thông tin.",
    features: [
      "Security Audit",
      "Penetration Testing",
      "DDoS Protection",
      "Data Encryption"
    ]
  }
]; 