'use client';

import { useEffect, useRef } from 'react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/tech-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            Công Nghệ Tương Lai
            <span className="text-primary block mt-2">Cho Doanh Nghiệp Của Bạn</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 animate-slide-up">
            Chúng tôi mang đến giải pháp công nghệ tiên tiến giúp doanh nghiệp của bạn
            phát triển trong kỷ nguyên số.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <button className="btn-primary">
              Khám Phá Ngay
            </button>
            <button className="btn-secondary">
              Liên Hệ Tư Vấn
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero; 