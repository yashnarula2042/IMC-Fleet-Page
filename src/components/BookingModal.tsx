'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar?: string;
}

export default function BookingModal({ isOpen, onClose, selectedCar }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        display: 'block'
      })
      .fromTo(contentRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
        "-=0.4"
      );
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        display: 'none'
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2000);
  };

  if (!isOpen && !backdropRef.current?.style.opacity) return null;

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[100] hidden bg-black/80 backdrop-blur-xl opacity-0"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <div 
          ref={contentRef}
          className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/40 hover:text-white hover:rotate-90 transition-all duration-500 z-10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <div className="grid md:grid-cols-5 h-full">
            {/* Visual Side */}
            <div className="hidden md:block col-span-2 bg-[#111111] border-r border-white/10 p-10 text-white relative overflow-hidden">
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#d4af37] via-[#d4af37]/50 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[#d4af37] text-[9px] tracking-[0.4em] uppercase font-display font-medium block mb-4">Exclusive Access</span>
                  <h3 className="font-headline font-medium text-2xl uppercase tracking-widest leading-tight mb-4 text-white">
                    Member <br /> Inquiry
                  </h3>
                  <div className="w-8 h-[1px] bg-[#d4af37]/50"></div>
                </div>
                
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-display font-medium">
                  Indian Motor Club <br /> Private Concierge
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="col-span-3 p-6 md:p-10">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-headline font-medium text-white uppercase tracking-tight">Reserve Experience</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 font-display font-medium mb-2">Selection</label>
                      <input 
                        type="text" 
                        defaultValue={selectedCar} 
                        readOnly={!!selectedCar}
                        placeholder="Model of Interest"
                        className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-body text-white focus:border-[#d4af37]/50 focus:ring-0 outline-none transition-all placeholder:text-white/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 font-display font-medium mb-2">Full Name</label>
                        <input type="text" required className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-body text-white focus:border-[#d4af37]/50 focus:ring-0 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 font-display font-medium mb-2">Email</label>
                        <input type="email" required className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-body text-white focus:border-[#d4af37]/50 focus:ring-0 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 font-display font-medium mb-2">Phone</label>
                        <input type="tel" required className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-body text-white focus:border-[#d4af37]/50 focus:ring-0 outline-none transition-all" />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full champagne-gradient text-black py-5 text-[10px] font-display font-semibold tracking-[0.3em] uppercase hover:brightness-110 transition-all duration-300 disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? 'Processing...' : 'Request Access'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 border border-[#d4af37]/30 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[#d4af37] text-3xl">check</span>
                  </div>
                  <h3 className="text-2xl font-headline font-medium text-white uppercase mb-4">Request Sent</h3>
                  <p className="text-sm text-white/40 font-body leading-relaxed max-w-xs">
                    Our concierge will reach out shortly to finalize your bespoke experience.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
