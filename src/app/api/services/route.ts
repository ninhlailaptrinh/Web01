import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data
    const services = [
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
        ]
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
        ]
      }
    ];

    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra' },
      { status: 500 }
    );
  }
} 