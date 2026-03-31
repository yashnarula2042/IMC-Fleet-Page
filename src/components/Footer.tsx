'use client';

import Link from "next/link";

export default function Footer({ onOpenModal }: { onOpenModal?: () => void } = {}) {
  return (
    <footer className="relative z-50 bg-black border-t border-white/10 w-full pt-24 pb-12 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 px-8 max-w-[1440px] mx-auto font-body text-sm tracking-wide text-white">
        <div className="col-span-2">
          <div className="text-xl font-medium font-headline tracking-[0.2em] uppercase text-white mb-6">Indian Motor Club</div>
          <p className="text-white mb-8 leading-relaxed max-w-xs font-body">
            India&apos;s premier destination for high-performance automotive excellence and concierge travel experiences.
          </p>
          <div className="flex gap-6 text-[#d4af37]">
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">language</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">share</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">distance</span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-[#d4af37] uppercase text-[10px] tracking-[0.3em] mb-6">The Fleet</h4>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Supercars</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Luxury SUVs</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Electric</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Bespoke</Link>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-[#d4af37] uppercase text-[10px] tracking-[0.3em] mb-6">Concierge</h4>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Contact</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Membership</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Locations</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">FAQ</Link>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-[#d4af37] uppercase text-[10px] tracking-[0.3em] mb-6">Company</h4>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Cookie Policy</Link>
          <Link href="#" className="block text-white hover:text-gray-300 transition-colors">Press Kit</Link>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h4 className="font-medium text-[#d4af37] uppercase text-[10px] tracking-[0.3em] mb-6">HQ</h4>
          <p className="text-white leading-relaxed font-body">
            DLF Cyber City<br />
            Phase 2, Gurugram<br />
            Haryana 122002
          </p>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-8 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white uppercase tracking-widest font-medium">
        <p>© 2024 INDIAN MOTOR CLUB. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-gray-300 transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Twitter (X)</Link>
        </div>
      </div>
    </footer>
  );
}
