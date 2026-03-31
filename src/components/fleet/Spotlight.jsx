'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Spotlight({ onOpenModal }) {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(textContainerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        yPercent: 15,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#0a0a0a] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div ref={textContainerRef} className="lg:col-span-5 space-y-12 relative z-10">
          <div>
            <span className="text-[#d4af37] font-display font-medium text-xs tracking-[0.3em] uppercase mb-6 block">Monthly Spotlight</span>
            <h2 className="text-6xl font-headline font-medium mb-6 leading-none text-white">MCLAREN<br />720S</h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm font-body">
              The pinnacle of British engineering. Lighter, stronger, faster. A predator on the asphalt designed for those who refuse to compromise.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-8">
            <div>
              <p className="text-4xl font-headline font-medium text-[#d4af37]">2.8s</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">0 – 62 MPH</p>
            </div>
            <div>
              <p className="text-4xl font-headline font-medium text-[#d4af37]">212</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Max MPH</p>
            </div>
            <div>
              <p className="text-4xl font-headline font-medium text-[#d4af37]">710</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Brake HP</p>
            </div>
            <div>
              <p className="text-4xl font-headline font-medium text-[#d4af37]">V8</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Twin-Turbo</p>
            </div>
          </div>
          <button
            onClick={onOpenModal}
            className="champagne-gradient px-12 py-5 text-black font-display font-semibold tracking-widest text-xs uppercase shadow-2xl hover:brightness-110 transition-all duration-300 active:scale-95"
          >
            Book The Legend
          </button>
        </div>
        <div className="lg:col-span-7 relative">
          <img
            ref={imgRef}
            className="w-full h-auto object-cover rounded-xl shadow-[0_0_120px_rgba(212,175,55,0.12)] scale-125 lg:translate-x-20"
            alt="Top-down view of a McLaren super car"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHrq0BQFyeWiTvh3zk_n-y3a9jhiv0UcS74x1qxzQYjP_RbTz0bQ0SRVhAMV2w1mZYJqsu2ze0SGr8uGzKRUI3sfqOLwTTJHoh29fyX2PQevNENkTKasaYP9PfvdBSt4qkdq3MzJGglpWFHXjZFX9qwlwHWhNnHDruxEu2fYqOyxbR5_grkj8ppPEpSJLIBWxYx-UpG09psOkLX3aYwpz1UdQ6JCCMCc8LAr7jnmy-chcz139E0KxJS1DtJ7eHBWiU08G4IFNBPNwQ"
          />
          <div className="absolute -top-10 -right-10 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none">720S</div>
        </div>
      </div>
    </section>
  );
}
