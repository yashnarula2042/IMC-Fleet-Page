'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Occasions({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".occasion-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl font-headline font-medium tracking-tight">DRIVEN BY PURPOSE</h2>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={onOpenModal}
            className="occasion-card group relative h-[500px] overflow-hidden cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              alt="Weddings" 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" 
            />
            <div className="absolute inset-0 bg-[#111111]/40 flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-headline font-medium">Weddings</h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500 font-body">Arrive in timeless elegance.</p>
            </div>
          </div>
          <div 
            onClick={onOpenModal}
            className="occasion-card group relative h-[500px] overflow-hidden cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              alt="Corporate" 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
            />
            <div className="absolute inset-0 bg-[#111111]/40 flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-headline font-medium">Corporate</h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500 font-body">The standard of professionalism.</p>
            </div>
          </div>
          <div 
            onClick={onOpenModal}
            className="occasion-card group relative h-[500px] overflow-hidden cursor-pointer"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              alt="Weekenders" 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80" 
            />
            <div className="absolute inset-0 bg-[#111111]/40 flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-headline font-medium">Weekenders</h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500 font-body">Pure driving pleasure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
