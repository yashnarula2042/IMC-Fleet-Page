export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1520031444763-b11b7749a2a5?auto=format&fit=crop&w=2560&q=90"
            alt="About Indian Motor Club"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
        <div className="relative z-10 px-8 md:px-16 pb-16 max-w-[1440px]">
          <span className="text-[#3A5A7A] font-headline font-medium uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Our Story
          </span>
          <h1 className="text-[12vw] md:text-[6vw] font-medium font-headline leading-[0.85] tracking-[-0.04em] text-white uppercase">
            About Us
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-8 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-headline font-medium tracking-tight uppercase mb-6">
              The Indian Motor Club
            </h2>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed font-body">
              Founded with a passion for automotive excellence, the Indian Motor Club is India&apos;s premier private automotive concierge. We curate the world&apos;s most prestigious vehicles — from vintage classics to modern supercars — for discerning clients who demand nothing less than perfection.
            </p>
          </div>

          <div className="border-t border-[#f0f0f0] pt-12">
            <h2 className="text-2xl md:text-3xl font-headline font-medium tracking-tight uppercase mb-6">
              Our Mission
            </h2>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed font-body">
              To deliver an unparalleled automotive experience through a meticulously maintained fleet, white-glove service, and a deep understanding of what makes each journey extraordinary. Every vehicle in our collection is hand-picked and maintained to the highest standards.
            </p>
          </div>

          <div className="border-t border-[#f0f0f0] pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-headline font-medium text-[#3A5A7A]">50+</p>
              <p className="text-xs uppercase tracking-widest text-[#999999] mt-2 font-medium">Vehicles</p>
            </div>
            <div>
              <p className="text-3xl font-headline font-medium text-[#3A5A7A]">5</p>
              <p className="text-xs uppercase tracking-widest text-[#999999] mt-2 font-medium">Cities</p>
            </div>
            <div>
              <p className="text-3xl font-headline font-medium text-[#3A5A7A]">24/7</p>
              <p className="text-xs uppercase tracking-widest text-[#999999] mt-2 font-medium">Concierge</p>
            </div>
            <div>
              <p className="text-3xl font-headline font-medium text-[#3A5A7A]">1000+</p>
              <p className="text-xs uppercase tracking-widest text-[#999999] mt-2 font-medium">Members</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
