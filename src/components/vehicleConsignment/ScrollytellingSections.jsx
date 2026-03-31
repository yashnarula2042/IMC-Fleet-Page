'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollytellingSections({ onProgress, onWashOpacity }) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      { id: '#ch-2', in: 12, out: 22 },
      { id: '#ch-3', in: 24, out: 34 },
      { id: '#ch-4', in: 36, out: 46 },
      { id: '#ch-5', in: 48, out: 58 },
      { id: '#ch-6', in: 60, out: 70 },
      { id: '#ch-7', in: 72, out: 82 }
    ];

    // ── Raw scroll → progress callback ──────────────────────────────
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => onProgress(self.progress)
    });

    // ── Hero entrance ────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.vc-gs-hero .vc-eyebrow',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
      .fromTo('.vc-gs-hero .vc-main-heading',
        { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.4 }, '-=0.6')
      .fromTo('.vc-gs-hero .vc-subheading',
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.85')
      .fromTo('.vc-gs-hero .vc-body-copy',
        { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
      .fromTo('.vc-gs-hero .vc-cta-row',
        { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7');

    const mm = gsap.matchMedia();

    // DESKTOP: Traditional Fade In/Out
    mm.add("(min-width: 769px)", () => {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
      scrubTl.to({}, { duration: 100 });
      scrubTl.to('#ch-1', { autoAlpha: 0, y: -45, duration: 2 }, 10);

      sections.forEach(ch => {
        const d = 2.5;
        scrubTl.fromTo(ch.id,
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: d },
          ch.in
        );
        scrubTl.to(ch.id,
          { autoAlpha: 0, y: -35, duration: d },
          ch.out - d
        );
      });
      
      scrubTl.call(() => onWashOpacity(0.35), null, 82);
      scrubTl.call(() => onWashOpacity(0.05), null, 10);
    });

    // MOBILE: Natural vertical scroll
    mm.add("(max-width: 768px)", () => {
      gsap.set('.vc-story-chapter', { autoAlpha: 1, y: 0, position: 'relative' });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [onProgress, onWashOpacity]);

  return (
    <div ref={containerRef} className="vc-scrollytelling-container" id="story-container">
      {/* Hero */}
      <section className="vc-story-chapter vc-ch-hero" id="ch-1" style={{ visibility: 'visible', opacity: 1 }}>
        <div className="vc-container vc-hero-container vc-gs-hero">
          <span className="vc-eyebrow">Exclusive Vehicle Ownership</span>
          <h1 className="vc-main-heading">Vehicle Consignment<br />Program</h1>
          <h2 className="vc-subheading">Turn Your Luxury Vehicle Into an Earning Asset</h2>
          <p className="vc-body-copy">A discreet, full-service consignment experience for luxury and vintage vehicles.</p>
          <div className="vc-cta-row">
            <a href="#" className="vc-btn vc-btn-primary">Request A Quote</a>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="vc-story-chapter vc-ch-text vc-ch-left" id="ch-2">
        <div className="vc-story-text-block">
          <span className="vc-eyebrow">Chapter 01</span>
          <h2>Some Vehicles Deserve More Than Storage</h2>
          <p>In India, exceptional automobiles often spend more time covered than experienced. This program transforms that stillness into opportunity.</p>
        </div>
      </section>

      <section className="vc-story-chapter vc-ch-text vc-ch-right" id="ch-3">
        <div className="vc-story-text-block">
          <span className="vc-eyebrow">Chapter 02</span>
          <h2>Positioned With Intention</h2>
          <p>We place your luxury or vintage vehicle into a curated ecosystem built for premium weddings, executive movement, and high-visibility occasions.</p>
        </div>
      </section>

      <section className="vc-story-chapter vc-ch-text vc-ch-left" id="ch-4">
        <div className="vc-story-text-block">
          <span className="vc-eyebrow">Chapter 03</span>
          <h2>Presented To The Right Audience</h2>
          <p>Every vehicle is marketed with discretion, visual quality, and the level of presentation expected by high-net-worth clients.</p>
        </div>
      </section>

      <section className="vc-story-chapter vc-ch-text vc-ch-right" id="ch-5">
        <div className="vc-story-text-block">
          <span className="vc-eyebrow">Chapter 04</span>
          <h2>Access, Carefully Controlled</h2>
          <p>From strict client vetting to secure booking workflows, every movement is approved, documented, and managed with precision.</p>
        </div>
      </section>

      <section className="vc-story-chapter vc-ch-text vc-ch-left" id="ch-6">
        <div className="vc-story-text-block">
          <span className="vc-eyebrow">Chapter 05</span>
          <h2>Every Detail, Managed For You</h2>
          <p>Chauffeur coordination, operational handling, presentation standards, and booking logistics are overseen end to end.</p>
        </div>
      </section>

      <section className="vc-story-chapter vc-ch-text vc-ch-right" id="ch-7">
        <div className="vc-story-text-block">
          <span className="vc-eyebrow">Chapter 06</span>
          <h2>Revenue Without Compromising The Asset</h2>
          <p>You receive structured reporting, controlled usage, and a professionally managed ownership experience designed to protect value over time.</p>
        </div>
      </section>
    </div>
  );
}
