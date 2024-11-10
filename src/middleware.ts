import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login';
  
  // Lấy token từ cookies
  const token = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value;

  // Xử lý routes admin
  if (isAdminPath) {
    if (!token && !isLoginPath) {
      // Chưa đăng nhập -> chuyển đến trang login admin
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (token && userRole !== 'admin') {
      // Không có quyền admin -> chuyển đến trang chủ
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Xử lý routes user yêu cầu đăng nhập
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}; 