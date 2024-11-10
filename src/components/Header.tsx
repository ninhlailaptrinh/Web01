'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const name = localStorage.getItem('user_name');
      setIsLoggedIn(!!token);
      setUserName(name || '');
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    setIsLoggedIn(false);
    setShowDropdown(false);
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-bold text-xl">TechVN</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-primary transition-colors">Trang chủ</Link>
            <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">Giới thiệu</Link>
            <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">Dịch vụ</Link>
            <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">Liên hệ</Link>
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <span>{userName}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2">
                    <Link 
                      href="/user/dashboard" 
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-primary transition-colors"
                    >
                      Quản lý dịch vụ
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-primary transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-300 hover:text-primary transition-colors">
                  Đăng nhập
                </Link>
                <Link href="/register" className="btn-primary">
                  Đăng ký ngay
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-primary transition-colors">Trang chủ</Link>
              <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">Giới thiệu</Link>
              <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">Dịch vụ</Link>
              <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">Liên hệ</Link>
              
              {isLoggedIn ? (
                <>
                  <div className="text-gray-300 font-medium">{userName}</div>
                  <Link href="/user/dashboard" className="text-gray-300 hover:text-primary transition-colors">
                    Quản lý dịch vụ
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-primary transition-colors text-left"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-300 hover:text-primary transition-colors">
                    Đăng nhập
                  </Link>
                  <Link href="/register" className="btn-primary w-full text-center">
                    Đăng ký ngay
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;