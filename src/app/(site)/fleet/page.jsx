'use client';

import { useState } from 'react';
import Hero from "@/components/fleet/Hero";
import BrandFleetSection from "@/components/fleet/BrandFleetSection";
import Spotlight from "@/components/fleet/Spotlight";
import Occasions from "@/components/fleet/Occasions";
import Services from "@/components/fleet/Services";
import BookingModal from "@/components/BookingModal";

export default function FleetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(undefined);

  const openModal = (carName) => {
    setSelectedCar(carName);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Hero onOpenModal={() => openModal()} />
      <BrandFleetSection onOpenModal={openModal} />
      <Spotlight onOpenModal={() => openModal()} />
      <Occasions onOpenModal={() => openModal()} />
      <Services onOpenModal={() => openModal()} />

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedCar={selectedCar} 
      />
    </main>
  );
}
