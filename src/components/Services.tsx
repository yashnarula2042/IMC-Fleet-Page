'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered service blocks fade-in
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

      // CTA scale up and fade
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
      <section ref={containerRef} className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 grid md:grid-cols-4 gap-12">
          <div className="service-block space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#3A5A7A]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>verified</span>
            <h3 className="text-lg font-headline font-medium uppercase tracking-tight">White-Glove Delivery</h3>
            <p className="text-sm text-[#666666] leading-relaxed font-body">Personal orientation and delivery at your residence, office, or airport terminal.</p>
          </div>
          <div className="service-block space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#3A5A7A]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>shield_with_heart</span>
            <h3 className="text-lg font-headline font-medium uppercase tracking-tight">Premium Insurance</h3>
            <p className="text-sm text-[#666666] leading-relaxed font-body">Comprehensive bespoke coverage designed exclusively for the private club market.</p>
          </div>
          <div className="service-block space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#3A5A7A]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>support_agent</span>
            <h3 className="text-lg font-headline font-medium uppercase tracking-tight">24/7 Concierge</h3>
            <p className="text-sm text-[#666666] leading-relaxed font-body">A dedicated curator at your service around the clock for any bespoke request.</p>
          </div>
          <div className="service-block space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#3A5A7A]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>airport_shuttle</span>
            <h3 className="text-lg font-headline font-medium uppercase tracking-tight">Airport Valet</h3>
            <p className="text-sm text-[#666666] leading-relaxed font-body">Seamless transitions with meet-and-greet services at all major terminals.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="py-32 px-8 bg-[#111111] text-center overflow-hidden">
        <div className="cta-content max-w-[1000px] mx-auto space-y-12">
          <h2 className="text-[10vw] md:text-[6vw] font-headline font-medium text-white tracking-[-0.04em] leading-[0.9] uppercase">
            READY TO <br /> <span className="text-[#3A5A7A]/40">INQUIRE?</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-body">
            Our curators are standing by to help you select the perfect vehicle for your next journey. Experience the Indian Motor Club difference today.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
            <button 
              onClick={onOpenModal}
              className="bg-[#3A5A7A] hover:bg-[#4A6A8A] px-12 py-6 text-white font-medium tracking-[0.2em] text-[10px] uppercase shadow-2xl w-full md:w-auto transition-all duration-300"
            >
              Reserve Now
            </button>
            <button 
              onClick={onOpenModal}
              className="border border-white/20 px-12 py-6 text-white font-medium tracking-[0.2em] text-[10px] uppercase hover:bg-white hover:text-[#111111] transition-all duration-300 w-full md:w-auto"
            >
              Speak to a Curator
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
