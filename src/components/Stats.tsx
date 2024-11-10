'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
}

const Stats = ({ stats }: { stats: Stat[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`
        grid grid-cols-2 md:grid-cols-4 gap-8 text-center
        transition-all duration-1000
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-gray-800/30 rounded-lg backdrop-blur-lg"
        >
          <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-gray-300">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats; 