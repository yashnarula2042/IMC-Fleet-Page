'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services({ onOpenModal }) {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".service-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });

    }, [containerRef, ctaRef]);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Trust Service Blocks */}
      <section ref={containerRef} className="py-24 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase font-display font-medium block mb-3">Private Club Benefits</span>
            <h2 className="text-2xl font-headline font-medium tracking-tight text-white uppercase">The IMC Standard</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="service-block space-y-5 p-8 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl text-[#d4af37]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>verified</span>
              <h3 className="text-base font-headline font-medium uppercase tracking-wider text-white">White-Glove Delivery</h3>
              <p className="text-sm text-white/40 leading-relaxed font-body">Personal orientation and delivery at your residence, office, or airport terminal.</p>
            </div>
            <div className="service-block space-y-5 p-8 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl text-[#d4af37]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>shield_with_heart</span>
              <h3 className="text-base font-headline font-medium uppercase tracking-wider text-white">Premium Insurance</h3>
              <p className="text-sm text-white/40 leading-relaxed font-body">Comprehensive bespoke coverage designed exclusively for the private club market.</p>
            </div>
            <div className="service-block space-y-5 p-8 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl text-[#d4af37]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>support_agent</span>
              <h3 className="text-base font-headline font-medium uppercase tracking-wider text-white">24/7 Concierge</h3>
              <p className="text-sm text-white/40 leading-relaxed font-body">A dedicated curator at your service around the clock for any bespoke request.</p>
            </div>
            <div className="service-block space-y-5 p-8 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl text-[#d4af37]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>airport_shuttle</span>
              <h3 className="text-base font-headline font-medium uppercase tracking-wider text-white">Airport Valet</h3>
              <p className="text-sm text-white/40 leading-relaxed font-body">Seamless transitions with meet-and-greet services at all major terminals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="py-40 px-8 bg-black text-center overflow-hidden border-t border-white/5 relative">
        {/* Decorative gold line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-24 bg-gradient-to-b from-transparent to-[#d4af37]/40"></div>
        <div className="cta-content max-w-[900px] mx-auto space-y-10">
          <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase font-display font-medium">Private Club Access</span>
          <h2 className="text-[12vw] md:text-[7vw] font-headline font-medium text-white tracking-[-0.04em] leading-[0.9] uppercase">
            READY TO <br /><span className="text-white/20">INQUIRE?</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto font-body">
            Our curators are standing by to help you select the perfect vehicle for your next journey. Experience the Indian Motor Club difference today.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={onOpenModal}
              className="champagne-gradient px-14 py-5 text-black font-display font-semibold tracking-[0.2em] text-[10px] uppercase shadow-2xl w-full md:w-auto hover:brightness-110 transition-all duration-300 active:scale-95"
            >
              Reserve Now
            </button>
            <button
              onClick={onOpenModal}
              className="border border-white/20 px-14 py-5 text-white font-display font-medium tracking-[0.2em] text-[10px] uppercase hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all duration-300 w-full md:w-auto"
            >
              Speak to a Curator
            </button>
          </div>
        </div>
        {/* Decorative bottom line */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1px] h-24 bg-gradient-to-t from-transparent to-[#d4af37]/40"></div>
      </section>
    </>
  );
}
