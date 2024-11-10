export default function About() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Về Chúng Tôi
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Chúng tôi là đội ngũ chuyên gia công nghệ với sứ mệnh mang đến những giải pháp 
            sáng tạo và hiệu quả.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Tầm Nhìn</h2>
            <p className="text-gray-300">
              Trở thành đối tác công nghệ hàng đầu, định hình tương lai số cho doanh nghiệp 
              Việt Nam và khu vực.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Sứ Mệnh</h2>
            <p className="text-gray-300">
              Cung cấp giải pháp công nghệ tiên tiến, giúp doanh nghiệp tối ưu hóa 
              hoạt động và tăng trưởng bền vững.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-gray-800/30 rounded-lg backdrop-blur-lg"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Đội Ngũ Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="text-center group relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6"
              >
                {/* Ảnh */}
                <div className="w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-700">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  </div>
                </div>
                {/* Chức vụ */}
                <div className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </div>
                {/* Mô tả */}
                <p className="text-gray-400 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
        />
      </svg>
    ),
    title: "Sáng Tạo",
    description: "Luôn tìm tòi và đổi mới để mang đến những giải pháp tốt nhất."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
    ),
    title: "Đồng Đội",
    description: "Hợp tác và chia sẻ để cùng nhau phát triển."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
        />
      </svg>
    ),
    title: "Chất Lượng",
    description: "Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất."
  }
];

const team = [
  {
    role: "CEO & Founder",
    description: "10+ năm kinh nghiệm trong lĩnh vực công nghệ"
  },
  {
    role: "Technical Director",
    description: "Chuyên gia về AI và Machine Learning"
  },
  {
    role: "Product Manager",
    description: "7+ năm kinh nghiệm phát triển sản phẩm"
  },
  {
    role: "Marketing Director",
    description: "Chuyên gia marketing số"
  }
]; 