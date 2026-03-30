'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BRANDS = [
  { 
    name: 'Rolls-Royce', 
    logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rolls-royce.png'
  },
  { 
    name: 'BMW', 
    logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png'
  },
  { 
    name: 'Mercedes-Benz', 
    logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mercedes-benz.png'
  },
  { 
    name: 'Volvo', 
    logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/volvo.png'
  },
  { 
    name: 'Land Rover', 
    logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/land-rover.png'
  },
  { 
    name: 'Lamborghini', 
    logo: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lamborghini.png'
  }
];

const CARS = [
  // Rolls-Royce
  { brand: 'Rolls-Royce', model: '1939 RR', trim: 'Vintage', price: '$2,500', power: '114 HP', engine: '7.3L V12', img: 'https://images.unsplash.com/photo-1536364127590-1594e3161294?q=80&w=2000&auto=format&fit=crop' },
  { brand: 'Rolls-Royce', model: '2013 RR', trim: 'Chauffeur', price: '$1,800', power: '453 HP', engine: '6.75L V12', img: 'https://images.unsplash.com/photo-1633501728282-36c646da8ea4?q=80&w=2000&auto=format&fit=crop' },
  
  // BMW
  { brand: 'BMW', model: 'Z4', trim: 'Roadster', price: '$400', power: '382 HP', engine: '3.0L I6', img: 'https://images.unsplash.com/photo-1618846702213-33e9b1bc182b?q=80&w=2000&auto=format&fit=crop' },
  { brand: 'BMW', model: '520i', trim: 'Sedan', price: '$350', power: '208 HP', engine: '2.0L I4', img: 'https://images.unsplash.com/photo-1555009710-18eaf3bc44ef?q=80&w=2000&auto=format&fit=crop' },
  { brand: 'BMW', model: '520d', trim: 'Diesel', price: '$350', power: '197 HP', engine: '2.0L I4', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop' },
  
  // Mercedes-Benz
  { brand: 'Mercedes-Benz', model: 'G-Wagon', trim: 'G63 AMG', price: '$1,200', power: '577 HP', engine: '4.0L V8 TT', img: 'https://images.unsplash.com/photo-1520038410233-7141be7b6f64?q=80&w=2000&auto=format&fit=crop' },
  { brand: 'Mercedes-Benz', model: 'GLX', trim: 'SUV', price: '$800', power: '362 HP', engine: '3.0L I6', img: 'https://images.unsplash.com/photo-1620884676159-b1d7d0a793a6?q=80&w=2000&auto=format&fit=crop' },
  { brand: 'Mercedes-Benz', model: 'E-Class', trim: 'Sedan', price: '$500', power: '255 HP', engine: '2.0L I4', img: 'https://images.unsplash.com/photo-1618349283737-02434868297a?q=80&w=2000&auto=format&fit=crop' },
  
  // Volvo
  { brand: 'Volvo', model: 'XC90', trim: 'Recharge', price: '$450', power: '455 HP', engine: 'Hybrid', img: 'https://images.unsplash.com/photo-1620608551722-48f5a6b093cd?q=80&w=2000&auto=format&fit=crop' },
  { brand: 'Volvo', model: 'S90', trim: 'Luxury Sedan', price: '$400', power: '295 HP', engine: 'Mild Hybrid', img: 'https://images.unsplash.com/photo-1610443905541-654dbda41fbe?q=80&w=2000&auto=format&fit=crop' },
  
  // Land Rover
  { brand: 'Land Rover', model: 'Range Rover', trim: 'HSE', price: '$900', power: '395 HP', engine: '3.0L I6', img: 'https://images.unsplash.com/photo-1644498308316-0969560337c7?q=80&w=2000&auto=format&fit=crop' },
  
  // Lamborghini
  { brand: 'Lamborghini', model: 'Aventador', trim: 'LP 780-4', price: '$2,500', power: '769 HP', engine: 'V12', img: 'https://images.unsplash.com/photo-1603597022026-b8440333796d?q=80&w=2000&auto=format&fit=crop' }
];

const SPOTLIGHT_DATA: Record<string, { models: string[], details: Record<string, any> }> = {
  'Rolls-Royce': {
    models: ['1939 RR', '2013 RR'],
    details: {
      '1939 RR': { name: '1939 RR', desc: 'A timeless classic. Experience the vintage elegance and unmatched prestige of a 1939 Rolls-Royce.', power: '114 HP', engine: '7.3L V12', accel: '14.0s', topSpeed: '160 KM/H', img: 'https://images.unsplash.com/photo-1536364127590-1594e3161294?q=80&w=2000&auto=format&fit=crop' },
      '2013 RR': { name: '2013 RR', desc: 'Modern luxury refined. The 2013 phantom represents the pinnacle of contemporary chauffeur-driven excellence.', power: '453 HP', engine: '6.75L V12', accel: '5.9s', topSpeed: '240 KM/H', img: 'https://images.unsplash.com/photo-1633501728282-36c646da8ea4?q=80&w=2000&auto=format&fit=crop' }
    }
  },
  'Lamborghini': {
    models: ['Aventador'],
    details: {
      'Aventador': { name: 'Aventador', desc: 'The pure, unadulterated essence of a naturally aspirated V12 engine. Born for the track, unleashed on the street.', power: '769 HP', engine: '6.5L V12', accel: '2.8s', topSpeed: '355 KM/H', img: 'https://images.unsplash.com/photo-1603597022026-b8440333796d?q=80&w=2000&auto=format&fit=crop' }
    }
  },
  'BMW': {
    models: ['Z4', '520i', '520d'],
    details: {
      'Z4': { name: 'BMW Z4', desc: 'A true roadster experience. Dynamic agility meets open-air freedom and stunning aesthetics.', power: '382 HP', engine: '3.0L I6', accel: '3.9s', topSpeed: '250 KM/H', img: 'https://images.unsplash.com/photo-1618846702213-33e9b1bc182b?q=80&w=2000&auto=format&fit=crop' },
      '520i': { name: 'BMW 520i', desc: 'The quintessential executive sedan combining supreme comfort with incredibly dynamic handling.', power: '208 HP', engine: '2.0L I4', accel: '7.5s', topSpeed: '230 KM/H', img: 'https://images.unsplash.com/photo-1555009710-18eaf3bc44ef?q=80&w=2000&auto=format&fit=crop' },
      '520d': { name: 'BMW 520d', desc: 'Efficient dynamics delivered precisely through an advanced, torque-heavy diesel powerhouse.', power: '197 HP', engine: '2.0L Turbo Diesel', accel: '7.3s', topSpeed: '233 KM/H', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop' }
    }
  },
  'Mercedes-Benz': {
    models: ['G-Wagon', 'GLX', 'E-Class'],
    details: {
      'G-Wagon': { name: 'G-Wagon', desc: 'The indispensable conqueror. Instantly recognizable, eternally sophisticated, and unstoppably capable.', power: '577 HP', engine: '4.0L V8 TT', accel: '4.5s', topSpeed: '220 KM/H', img: 'https://images.unsplash.com/photo-1520038410233-7141be7b6f64?q=80&w=2000&auto=format&fit=crop' },
      'GLX': { name: 'GLX', desc: 'The S-Class of SUVs. Offering the pinnacle of space, comfort, and versatile luxury.', power: '362 HP', engine: '3.0L I6', accel: '5.9s', topSpeed: '210 KM/H', img: 'https://images.unsplash.com/photo-1620884676159-b1d7d0a793a6?q=80&w=2000&auto=format&fit=crop' },
      'E-Class': { name: 'E-Class', desc: 'A masterclass in intelligence. An icon of innovative safety, performance, and highly sophisticated luxury.', power: '255 HP', engine: '2.0L I4', accel: '6.1s', topSpeed: '210 KM/H', img: 'https://images.unsplash.com/photo-1618349283737-02434868297a?q=80&w=2000&auto=format&fit=crop' }
    }
  },
  'Volvo': {
    models: ['XC90', 'S90'],
    details: {
      'XC90': { name: 'XC90 Recharge', desc: 'Modern progressive luxury. The flagship hybrid SUV combining zero-emission driving with commanding performance.', power: '455 HP', engine: 'Hybrid', accel: '5.0s', topSpeed: '180 KM/H', img: 'https://images.unsplash.com/photo-1620608551722-48f5a6b093cd?q=80&w=2000&auto=format&fit=crop' },
      'S90': { name: 'Volvo S90', desc: 'Scandinavian sanctuary. The elegant flagship sedan designed meticulously around human comfort and safety.', power: '295 HP', engine: 'Mild Hybrid', accel: '6.2s', topSpeed: '180 KM/H', img: 'https://images.unsplash.com/photo-1610443905541-654dbda41fbe?q=80&w=2000&auto=format&fit=crop' }
    }
  },
  'Land Rover': {
    models: ['Range Rover'],
    details: {
      'Range Rover': { name: 'Range Rover', desc: 'The pinnacle of refined capability. Unmistakable proportions, peerless luxury, and commanding all-terrain ability.', power: '395 HP', engine: '3.0L I6', accel: '5.8s', topSpeed: '242 KM/H', img: 'https://images.unsplash.com/photo-1644498308316-0969560337c7?q=80&w=2000&auto=format&fit=crop' }
    }
  }
};

export default function BrandFleetSection({ onOpenModal }: { onOpenModal: (carName?: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [currDegree, setCurrDegree] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const gridRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);
  
  const itemCount = BRANDS.length;
  const angle = 360 / itemCount;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Grid animations removed to guarantee 100% visibility on all devices
  }, []);

  const handlePrev = () => {
    setCurrDegree(prev => prev + angle);
    setActiveIndex(prev => (prev - 1 + itemCount) % itemCount);
    setSelectedModelIndex(0);
  };

  const handleNext = () => {
    setCurrDegree(prev => prev - angle);
    setActiveIndex(prev => (prev + 1) % itemCount);
    setSelectedModelIndex(0);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    
    if (diff > 50) {
      handlePrev();
      setStartX(e.clientX);
    } else if (diff < -50) {
      handleNext();
      setStartX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    // Throttle wheel events so it doesn't spin wildly
    if (now - lastWheelTime.current < 500) return;

    if (e.deltaX > 30 || e.deltaY > 30) {
      handleNext();
      lastWheelTime.current = now;
    } else if (e.deltaX < -30 || e.deltaY < -30) {
      handlePrev();
      lastWheelTime.current = now;
    }
  };

  const getTransform = (index: number) => {
    let diff = index - activeIndex;
    if (diff > itemCount / 2) diff -= itemCount;
    if (diff < -itemCount / 2) diff += itemCount;

    const rotY = diff * 25;
    const transZ = Math.abs(diff) * -250;
    const scale = Math.max(0.4, 1.4 - Math.abs(diff) * 0.3);
    const opacity = diff === 0 ? 1 : Math.max(0, 0.8 - Math.abs(diff) * 0.25);
    const zIndex = 10 - Math.abs(diff);

    // X displacement calculation to create a sweeping arc across the screen
    const transX = diff * 340;

    return {
      transform: `translateX(calc(-50% + ${transX}px)) translateY(-50%) translateZ(${transZ}px) scale(${scale}) rotateY(${rotY}deg)`,
      opacity: opacity,
      zIndex: zIndex,
    };
  };

  // Get dynamic spotlight data based on active brand
  const activeBrandName = BRANDS[activeIndex].name;
  const spotlightData = SPOTLIGHT_DATA[activeBrandName] || SPOTLIGHT_DATA['Rolls-Royce'];
  const currentModels = spotlightData.models;
  const currentModelKey = currentModels[selectedModelIndex] || currentModels[0];
  const currentSpotlight = spotlightData.details[currentModelKey];

  return (
    <>
      <section className="bg-surface py-20 px-6 md:px-12 relative overflow-hidden">
        {/* 3D Brand Carousel */}
        <div className="relative w-full mb-12 md:mb-20">
          <div 
            className={`relative h-[240px] md:h-[400px] w-full flex items-center justify-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} 
            style={{ perspective: '1500px' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
          >
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              {BRANDS.map((brand, index) => {
                const { transform, opacity, zIndex } = getTransform(index);
                const isActive = index === activeIndex;

                return (
                  <button 
                    key={brand.name}
                    className="absolute top-1/2 left-1/2 cursor-pointer outline-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto"
                    style={{ transform, opacity, zIndex }}
                    onClick={(e) => {
                       e.stopPropagation();
                       let diff = index - activeIndex;
                       if (diff > itemCount / 2) diff -= itemCount;
                       if (diff < -itemCount / 2) diff += itemCount;
                       setCurrDegree(prev => prev - (diff * angle));
                       setActiveIndex(index);
                       setSelectedModelIndex(0);
                    }}
                  >
                    <div className={`flex flex-col items-center justify-center transition-all duration-500 w-[160px] md:w-[260px] h-[160px] md:h-[260px] ${isActive ? 'grayscale-0' : 'grayscale opacity-30 md:opacity-60 hover:grayscale-0 hover:opacity-100'}`}>
                      <div className="w-full flex items-center justify-center mb-1 md:mb-6 h-28 md:h-44">
                        <img 
                          alt={brand.name} 
                          className="object-contain drop-shadow-2xl transition-all duration-500 max-h-[100px] md:max-h-[140px] max-w-[120px] md:max-w-[200px]" 
                          draggable="false" 
                          src={brand.logo} 
                        />
                      </div>
                      <span className={`uppercase font-medium tracking-[0.2em] transition-colors duration-500 text-[10px] md:text-xs ${isActive ? 'text-primary' : 'text-on-surface/40'}`}>
                        {brand.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Spotlight Model Selector Tabs */}
        <div className="max-w-[1440px] mx-auto mb-8 overflow-x-auto hide-scrollbar">
          <div className="flex bg-surface-container-low border border-outline-variant/10 rounded-sm overflow-hidden min-w-max">
            {currentModels.map((model, idx) => (
              <button 
                key={model}
                onClick={() => setSelectedModelIndex(idx)}
                className={`py-4 px-8 md:px-12 text-center font-headline text-[9px] md:text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500 relative group border-r border-outline-variant/10 last:border-r-0 ${selectedModelIndex === idx ? 'text-primary bg-surface-container-highest' : 'text-secondary hover:text-on-surface'}`}
              >
                <span className="relative z-10">{model}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Layout */}
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-surface-container-low/50 p-6 md:p-12 rounded-2xl border border-outline-variant/10">
            <div className="order-2 md:order-1">
              <span className="text-primary font-headline font-medium uppercase tracking-[0.4em] text-[10px] mb-4 block">
                {activeBrandName} Spotlight
              </span>
              <h3 className="text-on-surface font-headline text-3xl md:text-6xl font-medium tracking-tight mb-6">
                {currentSpotlight.name}
              </h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                {currentSpotlight.desc}
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 border-y border-outline-variant/20 py-6">
                <div>
                  <span className="text-secondary text-[10px] uppercase block mb-1 tracking-widest font-medium">Power</span>
                  <span className="text-on-surface font-headline font-medium text-lg md:text-xl">{currentSpotlight.power}</span>
                </div>
                <div>
                  <span className="text-secondary text-[10px] uppercase block mb-1 tracking-widest font-medium">Engine</span>
                  <span className="text-on-surface font-headline font-medium text-lg md:text-xl">{currentSpotlight.engine}</span>
                </div>
                <div className="hidden lg:block">
                  <span className="text-secondary text-[10px] uppercase block mb-1 tracking-widest font-medium">0-100</span>
                  <span className="text-on-surface font-headline font-medium text-xl">{currentSpotlight.accel}</span>
                </div>
                <div className="hidden lg:block">
                  <span className="text-secondary text-[10px] uppercase block mb-1 tracking-widest font-medium">Top Speed</span>
                  <span className="text-on-surface font-headline font-medium text-xl">{currentSpotlight.topSpeed}</span>
                </div>
              </div>
              
              <button 
                onClick={() => onOpenModal(currentSpotlight.name)}
                className="champagne-gradient text-on-primary font-headline font-medium px-10 py-5 tracking-[0.2em] uppercase text-[10px] hover:scale-105 transition-transform shadow-xl w-full md:w-auto"
              >
                Reserve This Model
              </button>
            </div>
            <div className="order-1 md:order-2 relative aspect-video md:aspect-[16/9] overflow-hidden rounded-lg">
              <img 
                key={currentSpotlight.img}
                alt={currentSpotlight.name} 
                className="w-full h-full object-cover" 
                src={currentSpotlight.img} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Isolated Section - Guaranteed Visibility */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-[#f0f0f0]">
        <div className="max-w-[1440px] mx-auto mb-12 md:mb-16 sticky top-0 md:relative z-20 bg-white/95 md:bg-transparent py-4 md:py-0 backdrop-blur md:backdrop-blur-none border-b border-[#f0f0f0] md:border-b-0">
          <span className="text-[#3A5A7A] font-headline font-medium uppercase tracking-[0.4em] text-[10px] mb-2 block text-center">Collection</span>
          <h2 className="text-on-surface font-headline text-2xl md:text-4xl font-medium tracking-tight uppercase text-center">THE PRIVATE COLLECTION</h2>
        </div>

        {/* 3-Column Vehicle Grid (Desktop) / Snap Carousel (Mobile) */}
        <div className="max-w-[1440px] mx-auto flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar gap-px bg-[#f0f0f0] border border-[#f0f0f0]">
          {CARS.map(car => (
            <div 
              key={car.model} 
              className="min-w-[85vw] md:min-w-0 snap-center group relative bg-white p-8 md:p-10 overflow-hidden transition-all duration-500 hover:bg-surface-container-highest flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-on-surface font-headline text-xl md:text-2xl font-medium mb-1 uppercase tracking-tight">{car.brand} {car.model}</h3>
                  <span className="text-[#3A5A7A] text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em]">{car.trim}</span>
                </div>
                <span className="text-on-surface font-headline font-medium text-lg md:text-xl tracking-tight">{car.price} <span className="text-[10px] font-normal text-secondary uppercase tracking-widest">/Day</span></span>
              </div>
              
              <div className="relative h-40 md:h-48 mb-8 flex items-center justify-center overflow-hidden">
                <img 
                  alt={`${car.brand} ${car.model}`} 
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                  src={car.img} 
                />
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-[#f0f0f0] pt-8 mb-10 mt-auto">
                <div>
                  <span className="text-[#999999] text-[9px] uppercase block mb-1 tracking-[0.3em] font-medium">Power</span>
                  <span className="text-on-surface font-headline font-medium text-xs md:text-sm uppercase">{car.power}</span>
                </div>
                <div>
                  <span className="text-[#999999] text-[9px] uppercase block mb-1 tracking-[0.3em] font-medium">Engine</span>
                  <span className="text-on-surface font-headline font-medium text-xs md:text-sm uppercase">{car.engine}</span>
                </div>
              </div>

              <button 
                onClick={() => onOpenModal(`${car.brand} ${car.model}`)}
                className="w-full bg-[#111111] text-white py-4 md:py-5 text-[9px] font-medium tracking-[0.3em] uppercase hover:bg-[#3A5A7A] transition-all duration-500"
              >
                Reserve This Model
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
