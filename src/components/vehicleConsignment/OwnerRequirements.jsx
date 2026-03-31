'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const checklistItems = [
  'Deliver the vehicle in showroom condition, fully fueled and detailed.',
  'Provide spare keys, original manuals, and factory accessories.',
  'Disclose modifications, full service history, and previous maintenance records.',
  'Maintain active comprehensive insurance throughout the consignment term.'
];

export default function OwnerRequirements() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.vc-requirements-wrap',
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vc-requirements-wrap',
          start: 'top 87%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="vc-section-requirements">
      <div className="vc-container">
        <div className="vc-requirements-wrap vc-gs-reveal">
          <div className="vc-req-left">
            <span className="vc-eyebrow">Entry Requirements</span>
            <h2>Owner Responsibilities<br />and Entry Requirements</h2>
            <p className="vc-req-intro">To participate in the program, owners should provide vehicles that meet a premium operational and presentation standard.</p>
            <ul className="vc-checklist">
              {checklistItems.map((item, index) => (
                <li key={index}>
                  <div className="vc-check-circle"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="vc-req-right">
            <div className="vc-doc-panel">
              <h3>Required Documentation</h3>
              <p>Valid registration, ownership authorization, and recent certified service logs are required to onboard your vehicle.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
