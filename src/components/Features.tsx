'use client';

import { useState } from 'react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Features = ({ features }: { features: Feature[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`
            p-6 rounded-xl bg-gray-800/50 backdrop-blur-lg
            transform transition-all duration-300
            ${hoveredIndex === index ? 'scale-105' : 'scale-100'}
            hover:shadow-2xl hover:shadow-primary/20
          `}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            transform: hoveredIndex === index 
              ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' 
              : 'perspective(1000px) rotateX(0) rotateY(0)'
          }}
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features; 