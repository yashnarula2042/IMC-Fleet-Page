'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandFleetSection from "@/components/BrandFleetSection";
import Spotlight from "@/components/Spotlight";
import Occasions from "@/components/Occasions";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string | undefined>(undefined);

  const openModal = (carName?: string) => {
    setSelectedCar(carName);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navbar onOpenModal={() => openModal()} />
      <Hero onOpenModal={() => openModal()} />
      <BrandFleetSection onOpenModal={openModal} />
      <Spotlight onOpenModal={() => openModal()} />
      <Occasions onOpenModal={() => openModal()} />
      <Services onOpenModal={() => openModal()} />
      <Footer onOpenModal={() => openModal()} />
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedCar={selectedCar} 
      />
    </main>
  );
}
