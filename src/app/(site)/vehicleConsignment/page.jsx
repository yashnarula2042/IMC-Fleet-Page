export default function VehicleConsignmentPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d32c946?auto=format&fit=crop&w=2560&q=90"
            alt="Vehicle Consignment"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
        <div className="relative z-10 px-8 md:px-16 pb-16 max-w-[1440px]">
          <span className="text-[#3A5A7A] font-headline font-medium uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Partner With Us
          </span>
          <h1 className="text-[10vw] md:text-[5vw] font-medium font-headline leading-[0.85] tracking-[-0.04em] text-white uppercase">
            Vehicle<br />Consignment
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-8 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-headline font-medium tracking-tight uppercase mb-6">
              List Your Vehicle
            </h2>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed font-body">
              Own a luxury or performance vehicle? Partner with the Indian Motor Club to have your vehicle featured in our exclusive fleet. We handle everything — from marketing and bookings to insurance and maintenance — while you earn from your prized automobile.
            </p>
          </div>

          <div className="border-t border-[#f0f0f0] pt-12">
            <h2 className="text-2xl md:text-3xl font-headline font-medium tracking-tight uppercase mb-6">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <span className="text-[#3A5A7A] font-headline font-medium text-2xl">01</span>
                <div>
                  <h3 className="font-headline font-medium text-lg uppercase tracking-tight mb-2">Submit Your Vehicle</h3>
                  <p className="text-[#666666] text-sm leading-relaxed font-body">Share details about your vehicle — make, model, year, and condition. Our team will review and assess eligibility.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-[#3A5A7A] font-headline font-medium text-2xl">02</span>
                <div>
                  <h3 className="font-headline font-medium text-lg uppercase tracking-tight mb-2">Inspection & Onboarding</h3>
                  <p className="text-[#666666] text-sm leading-relaxed font-body">We inspect the vehicle, handle professional photography, and onboard it into our curated fleet collection.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-[#3A5A7A] font-headline font-medium text-2xl">03</span>
                <div>
                  <h3 className="font-headline font-medium text-lg uppercase tracking-tight mb-2">Earn & Relax</h3>
                  <p className="text-[#666666] text-sm leading-relaxed font-body">Your vehicle is listed for premium bookings. You earn competitive returns while we take care of every detail.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0f0f0] pt-12 text-center">
            <p className="text-[#999999] text-sm font-body mb-6">Interested in consigning your vehicle?</p>
            <a
              href="mailto:concierge@indianmotorclub.com"
              className="inline-block bg-[#111111] text-white py-5 px-12 text-[10px] font-medium tracking-[0.3em] uppercase hover:bg-[#3A5A7A] transition-all duration-500"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
