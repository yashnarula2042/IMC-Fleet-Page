'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const services = [
  {
    num: '01',
    title: 'Verified Chauffeur Sourcing\nand Secure Booking Workflows',
    desc: 'Background-verified professionals operate every engagement under strict oversight protocols.'
  },
  {
    num: '02',
    title: 'Concierge-Level Service\nfor Every High-Profile Engagement',
    desc: 'White-glove handling from confirmation to completion, for every booking without exception.'
  },
  {
    num: '03',
    title: 'Full-Service Management\nHandled For You',
    desc: 'Operations, logistics, presentation and reporting — we carry the complete workload end to end.'
  },
  {
    num: '04',
    title: 'Monitored and Secure\nClimate-Controlled Storage',
    desc: 'Your vehicle is secured in premium indoor storage designed for long-term preservation.'
  },
  {
    num: '05',
    title: 'Professional Detailing\nFor All High End Vehicles',
    desc: 'Every deployment is preceded by a comprehensive detail to showroom standard.'
  },
  {
    num: '06',
    title: 'Transparent Performance\nReports and Breakdowns',
    desc: 'Monthly statements track every booking, usage hour, and revenue figure with full clarity.'
  }
];

export default function ServiceGrid() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Generic reveal
    gsap.fromTo('.vc-gs-reveal',
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vc-gs-reveal',
          start: 'top 87%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Service cards staggered reveal
    document.querySelectorAll('.vc-gs-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
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
    <section className="vc-section-full-service">
      <div className="vc-container">
        <div className="vc-section-intro vc-gs-reveal">
          <div className="vc-section-intro-label">
            <span className="vc-eyebrow">Our Services</span>
            <div className="vc-intro-rule"></div>
          </div>
          <div className="vc-section-intro-text">
            <h2>Full-Service Consignment<br />Handled For You</h2>
            <p>Our complete management approach removes the operational burden of monetising a luxury or vintage vehicle. With a transparent profit-sharing model, you benefit from recurring income while we manage the full journey.</p>
          </div>
        </div>

        <div className="vc-service-grid">
          {services.map((service, index) => (
            <div key={index} className="vc-service-card vc-gs-card" data-index={service.num}>
              <div className="vc-card-shimmer"></div>
              <div className="vc-card-top-line"></div>
              <span className="vc-card-num">{service.num}</span>
              <div className="vc-card-body">
                <h3 style={{ whiteSpace: 'pre-line' }}>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="vc-section-footnote vc-gs-reveal">
          <div className="vc-footnote-line"></div>
          <p>Each vehicle is screened, handled, and positioned to align with the standards expected in a world-class luxury fleet.</p>
        </div>
      </div>
    </section>
  );
}
