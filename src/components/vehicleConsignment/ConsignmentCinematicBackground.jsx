'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ConsignmentCinematicBackground = forwardRef(({ totalFrames, frameBuffer, useVideoFallback, videoSrc }, ref) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const washLayerRef = useRef(null);
  const state = useRef({
    targetProg: 0,
    lerpProg: 0,
    raf: null,
    ready: false
  });

  const LERP_FACTOR = 0.45;

  useImperativeHandle(ref, () => ({
    updateWash: (opacity) => {
      if (washLayerRef.current) {
        washLayerRef.current.style.background = `rgba(7, 7, 10, ${opacity})`;
      }
    }
  }));

  const drawFrame = (pct) => {
    const canvas = canvasRef.current;
    if (!canvas || useVideoFallback) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const idx = Math.max(0, Math.min(Math.round(pct * (totalFrames - 1)), totalFrames - 1));
    const img = frameBuffer[idx];
    
    if (!img || !img.complete || !img.naturalWidth) return;
    
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih);
    const dw = iw * s, dh = ih * s;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  const seekVideo = (pct) => {
    const video = videoRef.current;
    if (!video || !useVideoFallback) return;
    const dur = video.duration || 18;
    const t = Math.max(0, Math.min(pct * dur, dur - 0.05));
    try {
      if (video.fastSeek) video.fastSeek(t);
      else video.currentTime = t;
    } catch (_) {}
  };

  const rafLoop = () => {
    state.current.raf = null;
    const d = state.current.targetProg - state.current.lerpProg;
    
    if (Math.abs(d) < 0.00006) {
      if (useVideoFallback) seekVideo(state.current.lerpProg);
      else drawFrame(state.current.lerpProg);
      return;
    }
    
    state.current.lerpProg += d * LERP_FACTOR;
    if (useVideoFallback) seekVideo(state.current.lerpProg);
    else drawFrame(state.current.lerpProg);
    
    state.current.raf = requestAnimationFrame(rafLoop);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fitCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width  = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(state.current.lerpProg);
      }
    };

    window.addEventListener('resize', fitCanvas);
    fitCanvas();

    // Internal Loading logic if buffer is empty
    const loadFramesInternally = async () => {
      if (frameBuffer.length > 0) return;
      
      const pad = (n) => String(n).padStart(4, '0');
      const concurrency = 12;
      let next = 0;

      const loadNext = () => {
        if (next >= totalFrames) return;
        const i = next++;
        const img = new Image();
        img.onload = () => {
          frameBuffer[i] = img;
          if (i === 0) drawFrame(0);
          loadNext();
        };
        img.src = `/images/vehicle-consignment/frames/frame${pad(i + 1)}.webp`;
      };

      for (let c = 0; c < concurrency; c++) loadNext();
    };

    if (!useVideoFallback) loadFramesInternally();

    // Global Scroll scrubbing for the WHOLE PAGE
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        state.current.targetProg = self.progress;
        if (!state.current.raf) state.current.raf = requestAnimationFrame(rafLoop);
      }
    });

    return () => {
      window.removeEventListener('resize', fitCanvas);
      if (state.current.raf) cancelAnimationFrame(state.current.raf);
    };
  }, [totalFrames, frameBuffer, useVideoFallback]);

  return (
    <div className="cinematic-background" id="cinematic-bg">
      {useVideoFallback ? (
        <video 
          ref={videoRef} 
          className="hero-video" 
          muted 
          playsInline 
          preload="auto"
          style={{ display: 'block' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
      )}
      
      <div className="video-overlay noise-layer"></div>
      <div className="video-overlay vignette-layer"></div>
      <div ref={washLayerRef} className="video-overlay wash-layer" id="bg-dark-wash"></div>
    </div>
  );
});

ConsignmentCinematicBackground.displayName = 'ConsignmentCinematicBackground';

export default ConsignmentCinematicBackground;
