'use client';

import React, { useState, useRef, useMemo } from 'react';
import './vehicleConsignment.css';

import VehicleConsignmentPreloader from '@/components/vehicleConsignment/VehicleConsignmentPreloader';
import ConsignmentCinematicBackground from '@/components/vehicleConsignment/ConsignmentCinematicBackground';
import ConsignmentContent from '@/components/vehicleConsignment/ConsignmentContent';
import FinalCTA from '@/components/vehicleConsignment/FinalCTA';

export default function VehicleConsignmentPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useVideoFallback, setUseVideoFallback] = useState(false);
  const cinematicBgRef = useRef(null);

  // High-performance shared frame buffer
  const frameBuffer = useMemo(() => [], []);

  const totalFrames = 432;
  const framePath = '/images/vehicle-consignment/frames/frame';
  const videoFallbackSrc = '/images/vehicle-consignment/homepage imc.mp4';

  const handleWashUpdate = (opacity) => {
    if (cinematicBgRef.current) {
      cinematicBgRef.current.updateWash(opacity);
    }
  };

  return (
    <div className="consignment-page-wrapper">
      {/* 
          NOTE: Navbar and Footer are provided by the (site) layout.jsx. 
          Do not re-add them here to avoid duplication.
      */}

      {/* {!isLoaded && (
        <VehicleConsignmentPreloader 
          totalFrames={totalFrames} 
          framePath={framePath} 
          frameBuffer={frameBuffer}
          onFallback={() => setUseVideoFallback(true)}
          onComplete={() => setIsLoaded(true)} 
        />
      )} */}

      <ConsignmentCinematicBackground 
        ref={cinematicBgRef}
        totalFrames={totalFrames} 
        frameBuffer={frameBuffer}
        useVideoFallback={useVideoFallback}
        videoSrc={videoFallbackSrc}
      />

      <main className="main-content-flow">
        <ConsignmentContent onWashUpdate={handleWashUpdate} />
        {/* <FinalCTA /> */}
      </main>
    </div>
  );
}
