'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const protectionItems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 1L2 5v6c0 5.25 3.85 10.15 9 11.35C16.15 21.15 20 16.25 20 11V5L11 1z" stroke="currentColor" strokeWidth="1" fill="none"/>
      </svg>
    ),
    title: 'Strict Client Vetting',
    desc: 'Every client and itinerary is reviewed to ensure your vehicle is reserved only for reputable, high-end engagements.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="6" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1"/>
        <path d="M7 6V5a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    title: 'Secure Storage',
    desc: 'When not in circulation, your vehicle remains protected within monitored indoor storage designed for premium automotive care.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1"/>
        <path d="M11 6v5l3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Maintenance Oversight',
    desc: 'We monitor service schedules and condition standards so the vehicle remains road-ready while retaining long-term resale quality.'
  }
];

export default function AssetProtection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.vc-legacy-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="vc-section-legacy">
      <div className="vc-container">
        <div className="vc-legacy-header vc-gs-reveal">
          <span className="vc-eyebrow">Asset Protection</span>
          <h2>Preserving Your Asset's<br />Legacy and Value</h2>
        </div>
        <div className="vc-legacy-grid">
          {protectionItems.map((item, index) => (
            <div key={index} className="vc-legacy-card">
              <div className="vc-legacy-card-inner">
                <div className="vc-legacy-icon-wrap">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
