'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BRANDS = [
  { name: 'Rolls-Royce', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rolls-royce.png' },
  { name: 'Lamborghini', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lamborghini.png' },
  { name: 'Ferrari', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ferrari.png' },
  { name: 'Porsche', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/porsche.png' },
  { name: 'Bentley', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bentley.png' },
  { name: 'Aston Martin', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/aston-martin.png' },
  { name: 'Maserati', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/maserati.png' },
  { name: 'McLaren', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mclaren.png' },
  { name: 'Bugatti', logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bugatti.png' }
];

export default function BrandMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth;
    
    gsap.to(marquee, {
      x: `-${totalWidth / 2}px`,
      duration: 35,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div className="py-12 bg-white border-y border-[#f0f0f0] overflow-hidden select-none">
      <div 
        ref={marqueeRef}
        className="flex whitespace-nowrap gap-12 md:gap-24 items-center w-max"
      >
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 md:gap-24 group">
            <div className="w-16 h-12 md:w-20 md:h-16 flex items-center justify-center">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-full h-full object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#3A5A7A]/20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
