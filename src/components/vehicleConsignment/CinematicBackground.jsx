'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CinematicBackground = forwardRef(({ totalFrames, framePath }, ref) => {
  const canvasRef = useRef(null);
  const bgWashRef = useRef(null);
  const frames = useRef([]);
  const state = useRef({
    curFrame: 0,
    target: 0,
    lerped: 0,
    raf: null,
    canvasReady: false
  });

  const lerpFactor = 0.45;

  useImperativeHandle(ref, () => ({
    setTargetProgress: (p) => {
      state.current.target = p;
      if (!state.current.raf) {
        state.current.raf = requestAnimationFrame(rafLoop);
      }
    },
    setWashOpacity: (opacity) => {
      if (bgWashRef.current) {
        bgWashRef.current.style.background = `rgba(7, 7, 10, ${opacity})`;
      }
    }
  }));

  const pad = (n) => String(n).padStart(4, '0');

  const drawFrame = (idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = frames.current[idx];
    
    if (!img || !img.complete || !img.naturalWidth) return;
    
    state.current.curFrame = idx;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih);
    const dw = iw * s, dh = ih * s;
    
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  const rafLoop = () => {
    state.current.raf = null;
    const d = state.current.target - state.current.lerped;
    
    if (Math.abs(d) < 0.00006) {
      drawFrame(Math.round(state.current.lerped * (totalFrames - 1)));
      return;
    }
    
    state.current.lerped += d * lerpFactor;
    drawFrame(Math.max(0, Math.min(
      Math.round(state.current.lerped * (totalFrames - 1)),
      totalFrames - 1
    )));
    
    state.current.raf = requestAnimationFrame(rafLoop);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const fitCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (state.current.canvasReady) {
          drawFrame(state.current.curFrame);
        }
      }
    };

    window.addEventListener('resize', fitCanvas);
    fitCanvas();

    // Pre-load all frames into the ref
    const loadFrames = async () => {
      const promises = [];
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = `${framePath}${pad(i + 1)}.webp`;
        frames.current[i] = img;
        promises.push(new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        }));
      }
      await Promise.all(promises);
      state.current.canvasReady = true;
      drawFrame(0);
    };

    loadFrames();

    return () => {
      window.removeEventListener('resize', fitCanvas);
      if (state.current.raf) {
        cancelAnimationFrame(state.current.raf);
      }
    };
  }, [totalFrames, framePath]);

  return (
    <div className="vc-cinematic-background" id="cinematic-bg">
      <canvas ref={canvasRef} className="vc-hero-canvas"></canvas>
      <div className="vc-video-overlay vc-noise-layer"></div>
      <div className="vc-video-overlay vc-vignette-layer"></div>
      <div ref={bgWashRef} className="vc-video-overlay vc-wash-layer" id="bg-dark-wash"></div>
    </div>
  );
});

CinematicBackground.displayName = 'CinematicBackground';

export default CinematicBackground;
