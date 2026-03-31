'use client';

import { useState } from 'react';
import Hero from "@/components/fleet/Hero";
import BrandFleetSection from "@/components/fleet/BrandFleetSection";
import Occasions from "@/components/fleet/Occasions";
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
      <Occasions onOpenModal={() => openModal()} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCar={selectedCar}
      />
    </main>
  );
}
