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
        { y: 50, opacity: 0 },
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
    // Simulate API call
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
      className="fixed inset-0 z-[100] hidden bg-black/60 backdrop-blur-md opacity-0"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <div 
          ref={contentRef}
          className="bg-white w-full max-w-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-[#111111] hover:rotate-90 transition-transform duration-500 z-10"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <div className="grid md:grid-cols-5 h-full">
            {/* Visual Side */}
            <div className="hidden md:block col-span-2 bg-[#111111] p-12 text-white relative">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-headline font-medium text-2xl uppercase tracking-widest leading-tight mb-4">
                    Member <br /> Inquiry
                  </h3>
                  <div className="w-12 h-[1px] bg-white/30"></div>
                </div>
                
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
                  Indian Motor Club <br /> Private Concierge
                </p>
              </div>
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A5A7A] to-transparent"></div>
              </div>
            </div>

            {/* Form Side */}
            <div className="col-span-3 p-6 md:p-12">
              {!isSubmitted ? (
                <>
                  <div className="mb-6 md:mb-10">
                    <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#3A5A7A] font-medium block mb-2">Exclusive Access</span>
                    <h2 className="text-2xl md:text-3xl font-headline font-medium text-[#111111] uppercase tracking-tight">Reserve Experience</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#999999] font-medium mb-2">Selection</label>
                      <input 
                        type="text" 
                        defaultValue={selectedCar} 
                        readOnly={!!selectedCar}
                        placeholder="Model of Interest"
                        className="w-full bg-[#f8f8f8] border-none px-4 py-4 text-sm font-medium focus:ring-1 focus:ring-[#3A5A7A] outline-none transition-all placeholder:text-black/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#999999] font-medium mb-2">Full Name</label>
                        <input type="text" required className="w-full bg-[#f8f8f8] border-none px-4 py-4 text-sm font-medium focus:ring-1 focus:ring-[#3A5A7A] outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#999999] font-medium mb-2">Email</label>
                        <input type="email" required className="w-full bg-[#f8f8f8] border-none px-4 py-4 text-sm font-medium focus:ring-1 focus:ring-[#3A5A7A] outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#999999] font-medium mb-2">Phone</label>
                        <input type="tel" required className="w-full bg-[#f8f8f8] border-none px-4 py-4 text-sm font-medium focus:ring-1 focus:ring-[#3A5A7A] outline-none" />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#111111] text-white py-5 text-[10px] font-medium tracking-[0.3em] uppercase hover:bg-[#3A5A7A] transition-all duration-500 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Request Access'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-[#3A5A7A]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[#3A5A7A] text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-headline font-medium text-[#111111] uppercase mb-4">Request Sent</h3>
                  <p className="text-sm text-[#666666] font-body leading-relaxed max-w-xs">
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
