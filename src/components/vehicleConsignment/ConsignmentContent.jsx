'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ConsignmentContent({ onWashUpdate }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const spineProgressRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // ─── Scrollytelling Setup ──────────────────────────────────────
    const chapters = [
      { id: '#ch-2', in: 12, out: 22 },
      { id: '#ch-3', in: 24, out: 34 },
      { id: '#ch-4', in: 36, out: 46 },
      { id: '#ch-5', in: 48, out: 58 },
      { id: '#ch-6', in: 60, out: 70 },
      { id: '#ch-7', in: 72, out: 82 }
    ];

    mm.add("(min-width: 769px)", () => {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#story-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });

      scrubTl.to({}, { duration: 100 });
      scrubTl.to('#ch-1', { autoAlpha: 0, y: -45, duration: 2 }, 10);

      chapters.forEach(ch => {
        scrubTl.fromTo(ch.id, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 2.5 }, ch.in);
        scrubTl.to(ch.id, { autoAlpha: 0, y: -35, duration: 2.5 }, ch.out - 2.5);
      });

      // Smooth wash transitions instead of abrupt calls
      scrubTl.to('#bg-dark-wash', { backgroundColor: 'rgba(7,7,10,0.05)', duration: 2 }, 10);
      scrubTl.to('#bg-dark-wash', { backgroundColor: 'rgba(7,7,10,0.35)', duration: 8 }, 82);
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set('.story-chapter', { autoAlpha: 1, y: 0, position: 'relative' });
    });

    // ─── Generic Reveals ───────────────────────────────────────────
    gsap.utils.toArray('.gs-reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.utils.toArray('.gs-fade-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.utils.toArray('.gs-card').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }
      });
    });

    // ─── Horizontal Timeline (Desktop Only Pinning) ────────────────
    mm.add("(min-width: 769px)", () => {
      const hTrack = trackRef.current;
      if (!hTrack) return;

      const getDelta = () => hTrack.scrollWidth - window.innerWidth;
      const hTween = gsap.to(hTrack, { 
        x: () => -getDelta(), 
        ease: 'none',
        scrollTrigger: {
          trigger: '#timeline-section',
          start: 'top top',
          end: () => `+=${getDelta()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      if (spineProgressRef.current) {
        gsap.to(spineProgressRef.current, {
          width: '100%', ease: 'none',
          scrollTrigger: {
            trigger: '#timeline-section',
            start: 'top top',
            end: () => `+=${getDelta()}`,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      document.querySelectorAll('.timeline-step').forEach(step => {
        const card = step.querySelector('.step-card');
        gsap.from(card, {
          opacity: 0, y: 35, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { 
            trigger: step, 
            containerAnimation: hTween, 
            start: 'left 88%', 
            toggleActions: 'play none none reverse' 
          }
        });
      });
    });

    // ─── Asset Protection ──────────────────────────────────────────
    gsap.utils.toArray('.legacy-card').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: i * 0.12,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      });
    });

    // ─── RECONSTRUCTED: Stats Grid ─────────────────────────────────
    gsap.utils.toArray('.req-stat').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [onWashUpdate]);

  return (
    <div ref={containerRef} className="consignment-page">
      <div className="scrollytelling-container" id="story-container">
        {/* ch-1: Hero */}
        <section className="story-chapter ch-hero" id="ch-1" style={{ visibility: 'visible', opacity: 1 }}>
          <div className="container hero-container">
            <span className="eyebrow">Exclusive Vehicle Ownership</span>
            <h1 className="main-heading">Vehicle Consignment<br />Program</h1>
            <h2 className="subheading">Turn Your Luxury Vehicle Into an Earning Asset</h2>
            <p className="body-copy">A discreet, full-service consignment experience for luxury and vintage vehicles.</p>
            <div className="cta-row">
              <a href="#" className="btn btn-primary">Request A Quote</a>
            </div>
          </div>
        </section>

        {/* Narrative Chapters */}
        <section className="story-chapter ch-left" id="ch-2">
          <div className="story-text-block">
            <span className="eyebrow">Chapter 01</span>
            <h2>Some Vehicles Deserve More Than Storage</h2>
            <p>In India, exceptional automobiles often spend more time covered than experienced. This program transforms that stillness into opportunity.</p>
          </div>
        </section>

        <section className="story-chapter ch-right" id="ch-3">
          <div className="story-text-block">
            <span className="eyebrow">Chapter 02</span>
            <h2>Positioned With Intention</h2>
            <p>We place your luxury or vintage vehicle into a curated ecosystem built for premium weddings, executive movement, and high-visibility occasions.</p>
          </div>
        </section>

        <section className="story-chapter ch-left" id="ch-4">
          <div className="story-text-block">
            <span className="eyebrow">Chapter 03</span>
            <h2>Presented To The Right Audience</h2>
            <p>Every vehicle is marketed with discretion, visual quality, and the level of presentation expected by high-net-worth clients.</p>
          </div>
        </section>

        <section className="story-chapter ch-right" id="ch-5">
          <div className="story-text-block">
            <span className="eyebrow">Chapter 04</span>
            <h2>Access, Carefully Controlled</h2>
            <p>From strict client vetting to secure booking workflows, every movement is approved, documented, and managed with precision.</p>
          </div>
        </section>

        <section className="story-chapter ch-left" id="ch-6">
          <div className="story-text-block">
            <span className="eyebrow">Chapter 05</span>
            <h2>Every Detail, Managed For You</h2>
            <p>Chauffeur coordination, operational handling, presentation standards, and booking logistics are overseen end to end.</p>
          </div>
        </section>

        <section className="story-chapter ch-right" id="ch-7">
          <div className="story-text-block">
            <span className="eyebrow">Chapter 06</span>
            <h2>Revenue Without Compromising The Asset</h2>
            <p>You receive structured reporting, controlled usage, and a professionally managed ownership experience designed to protect value over time.</p>
          </div>
        </section>
      </div>

      <main className="post-story-content" id="grounded-content">
        {/* ① Full-Service Consignment */}
        <section className="section-full-service">
          <div className="container">
            <div className="section-intro gs-reveal">
              <div className="section-intro-label">
                <span className="eyebrow">Our Services</span>
                <div className="intro-rule"></div>
              </div>
              <div className="section-intro-text">
                <h2>Full-Service Consignment<br />Handled For You</h2>
                <p>Our complete management approach removes the operational burden of monetising a luxury or vintage vehicle. With a transparent profit-sharing model, you benefit from recurring income while we manage the full journey.</p>
              </div>
            </div>

            <div className="service-grid">
              {[
                { n: '01', t: 'Verified Chauffeur Sourcing\nand Secure Booking Workflows', d: 'Background-verified professionals operate every engagement under strict oversight protocols.' },
                { n: '02', t: 'Concierge-Level Service\nfor Every High-Profile Engagement', d: 'White-glove handling from confirmation to completion, for every booking without exception.' },
                { n: '03', t: 'Full-Service Management\nHandled For You', d: 'Operations, logistics, presentation and reporting — we carry the complete workload end to end.' },
                { n: '04', t: 'Monitored and Secure\nClimate-Controlled Storage', d: 'Your vehicle is secured in premium indoor storage designed for long-term preservation.' },
                { n: '05', t: 'Professional Detailing\nFor All High End Vehicles', d: 'Every deployment is preceded by a comprehensive detail to showroom standard.' },
                { n: '06', t: 'Transparent Performance\nReports and Breakdowns', d: 'Monthly statements track every booking, usage hour, and revenue figure with full clarity.' }
              ].map((s, i) => (
                <div key={i} className="service-card gs-card" data-index={s.n}>
                  <div className="card-shimmer"></div>
                  <div className="card-top-line"></div>
                  <span className="card-num">{s.n}</span>
                  <div className="card-body">
                    <h3 style={{ whiteSpace: 'pre-line' }}>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-footnote gs-reveal">
              <div className="footnote-line"></div>
              <p>Each vehicle is screened, handled, and positioned to align with the standards expected in a world-class luxury fleet.</p>
            </div>
          </div>
        </section>

        {/* ② How The Program Works */}
        <section className="section-timeline" id="timeline-section">
          <div className="container">
            <div className="timeline-header gs-reveal">
              <span className="eyebrow">The Process</span>
              <h2 className="timeline-title">How The Program Works</h2>
            </div>
          </div>
          <div className="timeline-wrapper">
            <div ref={trackRef} className="horizontal-track" id="horizontal-track">
              <div className="timeline-spine">
                <div className="spine-track"></div>
                <div ref={spineProgressRef} className="spine-progress"></div>
              </div>
              {[
                { n: '01', t: 'Inspection and Onboarding', d: "We assess the vehicle's condition, document its details, and confirm all tracking and operational systems are ready for transparent management." },
                { n: '02', t: 'Premium Placement and Exposure', d: 'Your vehicle is introduced across carefully selected channels for weddings, executive requirements, luxury hospitality, and high-profile private use.' },
                { n: '03', t: 'Managed Chauffeur Operations', d: 'Only professional, background-verified chauffeurs operate the vehicle, supported by structured oversight and comprehensive insurance coverage.' },
                { n: '04', t: 'Monthly Income and Reporting', d: 'Owners earn 50% of net rental revenue with detailed statements that track usage, bookings, and operational clarity.' }
              ].map((s, i) => (
                <div key={i} className="timeline-step">
                  <div className="step-card">
                    <span className="step-num">{s.n}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ Asset Protection */}
        <section className="section-legacy">
          <div className="container">
            <div className="legacy-header gs-reveal">
              <span className="eyebrow">Asset Protection</span>
              <h2>Preserving Your Asset's<br />Legacy and Value</h2>
            </div>
            <div className="legacy-grid">
              {[
                { t: 'Strict Client Vetting', d: 'Every client and itinerary is reviewed to ensure your vehicle is reserved only for reputable, high-end engagements.' },
                { t: 'Secure Storage', d: 'When not in circulation, your vehicle remains protected within monitored indoor storage designed for premium automotive care.' },
                { t: 'Maintenance Oversight', d: 'We monitor service schedules and condition standards so the vehicle remains road-ready while retaining long-term resale quality.' }
              ].map((s, i) => (
                <div key={i} className="legacy-card">
                  <div className="legacy-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="2" y="6" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
                      <path d="M7 6V5a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ④ Owner Requirements & RECONSTRUCTED Stats Grid */}
        <section className="section-requirements">
          <div className="container">
            <div className="requirements-wrap gs-reveal">
              <div className="req-left">
                <span className="eyebrow">Entry Requirements</span>
                <h2>Owner Responsibilities<br />and Entry Requirements</h2>
                <p className="req-intro">To participate in the program, owners should provide vehicles that meet a premium operational and presentation standard.</p>
                <ul className="checklist">
                  {[
                    'Deliver the vehicle in showroom condition, fully fueled and detailed.',
                    'Provide spare keys, original manuals, and factory accessories.',
                    'Disclose modifications, full service history, and previous maintenance records.',
                    'Maintain active comprehensive insurance throughout the consignment term.'
                  ].map((item, index) => (
                    <li key={index}>
                      <div className="check-circle"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="req-right">
                {/* Stats Grid Reconstructed based on CSS/JS existence */}
                <div className="req-stat-grid">
                  <div className="req-stat">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Transparent Revenue</span>
                  </div>
                  <div className="req-stat">
                    <span className="stat-value">24/7</span>
                    <span className="stat-label">Monitored Care</span>
                  </div>
                  <div className="req-stat">
                    <span className="stat-value">50%</span>
                    <span className="stat-label">Owner Profit Share</span>
                  </div>
                  <div className="req-stat">
                    <span className="stat-value">Elite</span>
                    <span className="stat-label">Client Network</span>
                  </div>
                </div>

                <div className="doc-panel">
                  <h3>Required Documentation</h3>
                  <p>Valid registration, ownership authorization, and recent certified service logs are required to onboard your vehicle.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
