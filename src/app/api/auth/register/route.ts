import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Thực hiện đăng ký user trong database
    // Mock response
    return NextResponse.json({ 
      success: true, 
      message: 'Đăng ký thành công' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra' },
      { status: 500 }
    );
  }
} 