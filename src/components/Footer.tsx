import Link from "next/link";

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer className="bg-white border-t border-[#f0f0f0] w-full pt-24 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 px-8 max-w-[1440px] mx-auto font-body text-sm tracking-wide text-[#111111]">
        <div className="col-span-2">
          <div className="text-xl font-medium font-headline tracking-[0.2em] uppercase text-[#111111] mb-6">Indian Motor Club</div>
          <p className="text-[#666666] mb-8 leading-relaxed max-w-xs font-body">
            India&apos;s premier destination for high-performance automotive excellence and concierge travel experiences.
          </p>
          <div className="flex gap-6 text-[#3A5A7A]">
            <span className="material-symbols-outlined cursor-pointer hover:text-[#111111] transition-colors">language</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#111111] transition-colors">share</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#111111] transition-colors">distance</span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-[#3A5A7A] uppercase text-[10px] tracking-[0.3em] mb-6">The Fleet</h4>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Supercars</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Luxury SUVs</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Electric</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Bespoke</Link>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-[#3A5A7A] uppercase text-[10px] tracking-[0.3em] mb-6">Concierge</h4>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Contact</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Membership</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Locations</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">FAQ</Link>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-[#3A5A7A] uppercase text-[10px] tracking-[0.3em] mb-6">Company</h4>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Privacy Policy</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Terms of Service</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Cookie Policy</Link>
          <Link href="#" className="block text-[#999999] hover:text-[#111111] transition-colors">Press Kit</Link>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h4 className="font-medium text-[#3A5A7A] uppercase text-[10px] tracking-[0.3em] mb-6">HQ</h4>
          <p className="text-[#999999] leading-relaxed font-body">
            DLF Cyber City<br />
            Phase 2, Gurugram<br />
            Haryana 122002
          </p>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-8 mt-20 pt-10 border-t border-[#f0f0f0] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#999999] uppercase tracking-widest font-medium">
        <p>© 2024 INDIAN MOTOR CLUB. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-[#111111] transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-[#111111] transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-[#111111] transition-colors">Twitter (X)</Link>
        </div>
      </div>
    </footer>
  );
}
