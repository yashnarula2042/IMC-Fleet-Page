'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function VehicleConsignmentPreloader({ onComplete, onFallback, totalFrames, framePath, frameBuffer }) {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const pad = (n) => String(n).padStart(4, '0');

    // Step 1: Probe for frame existence
    const probe = new Image();
    probe.src = `${framePath}${pad(1)}.webp`;

    probe.onload = () => {
      // Frames found! Proceed with multi-frame preload
      frameBuffer[0] = probe;
      loadAllFrames();
    };

    probe.onerror = () => {
      // Frames not found! Signal fallback to video
      console.warn('[IMC] frames/ not found — falling back to video.');
      onFallback && onFallback();
      dismissPreloader();
    };

    const loadAllFrames = () => {
      let loadedCount = 1; // already have the probe
      const concurrency = 16;
      let nextIndex = 1;

      const loadNext = () => {
        if (nextIndex >= totalFrames) return;

        const i = nextIndex++;
        const img = new Image();
        
        img.onload = () => {
          frameBuffer[i] = img;
          loadedCount++;
          const pct = Math.floor((loadedCount / totalFrames) * 100);
          setProgress(pct);
          
          if (fillRef.current) fillRef.current.style.width = `${pct}%`;
          if (loadedCount === totalFrames) dismissPreloader();
          else loadNext();
        };

        img.onerror = () => {
          loadedCount++; // even if fails, count it to finish
          if (loadedCount === totalFrames) dismissPreloader();
          else loadNext();
        };

        img.src = `${framePath}${pad(i + 1)}.webp`;
      };

      for (let c = 0; c < concurrency; c++) loadNext();
    };

    const dismissPreloader = () => {
      gsap.to(preloaderRef.current, {
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        onComplete: () => {
          if (preloaderRef.current) preloaderRef.current.style.display = 'none';
          onComplete && onComplete();
        }
      });
    };

    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [totalFrames, framePath, onComplete, onFallback, frameBuffer]);

  return (
    <div ref={preloaderRef} className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-logo">IMC</span>
        <span className="preloader-eyebrow">Preparing Experience</span>
        <div className="preloader-bar-wrap">
          <div ref={fillRef} className="preloader-bar-fill"></div>
        </div>
        <span className="preloader-count">{progress}%</span>
      </div>
    </div>
  );
}
