'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FinalCTA() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.final-cta-reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 35 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  return (
    <section className="section-cta">
      <div className="cta-ghost-text" aria-hidden="true">CONSIGNMENT</div>
      <div className="container">
        <div className="cta-wrap final-cta-reveal">
          <span className="eyebrow">Begin Your Journey</span>
          <h2>List Your Vehicle<br />With Confidence</h2>
          <p>
            Let our team oversee bookings, presentation, storage, and operational management 
            — while your luxury or vintage vehicle becomes a controlled earning asset.
          </p>
          <div className="cta-actions">
            <a href="#" className="btn btn-primary btn-large">Request A Quote</a>
            <a href="#" className="btn btn-outline btn-large">Speak With Our Team</a>
          </div>
        </div>
      </div>
    </section>
  );
}
