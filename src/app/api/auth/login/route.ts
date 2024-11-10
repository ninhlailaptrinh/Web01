import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const MOCK_USER = {
  email: 'test@gmail.com',
  password: '123456',
  name: 'Nguyễn Văn A',
  role: 'user'
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock kiểm tra đăng nhập
    if (body.email === MOCK_USER.email && body.password === MOCK_USER.password) {
      const token = 'mock_token_' + Date.now();
      
      // Set cookie
      cookies().set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          name: MOCK_USER.name,
          email: MOCK_USER.email,
          role: MOCK_USER.role
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Email hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Đăng nhập thất bại' },
      { status: 401 }
    );
  }
} 