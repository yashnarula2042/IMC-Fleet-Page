'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    num: '01',
    title: 'Inspection and Onboarding',
    desc: 'We assess the vehicle\'s condition, document its details, and confirm all tracking and operational systems are ready for transparent management.'
  },
  {
    num: '02',
    title: 'Premium Placement and Exposure',
    desc: 'Your vehicle is introduced across carefully selected channels for weddings, executive requirements, luxury hospitality, and high-profile private use.'
  },
  {
    num: '03',
    title: 'Managed Chauffeur Operations',
    desc: 'Only professional, background-verified chauffeurs operate the vehicle, supported by structured oversight and comprehensive insurance coverage.'
  },
  {
    num: '04',
    title: 'Monthly Income and Reporting',
    desc: 'Owners earn 50% of net rental revenue with detailed statements that track usage, bookings, and operational clarity.'
  }
];

export default function HorizontalTimeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timelineSection = sectionRef.current;
    const hTrack = trackRef.current;
    const spineBar = progressBarRef.current;

    if (!timelineSection || !hTrack) return;

    const getScroll = () => -(hTrack.scrollWidth - window.innerWidth + 80);

    const hTween = gsap.to(hTrack, { 
      x: getScroll, 
      ease: 'none' 
    });

    ScrollTrigger.create({
      trigger: timelineSection,
      start: 'top top',
      end: () => `+=${hTrack.scrollWidth}`,
      pin: true,
      animation: hTween,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1
    });

    if (spineBar) {
      gsap.to(spineBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineSection,
          start: 'top top',
          end: () => `+=${hTrack.scrollWidth}`,
          scrub: 1
        }
      });
    }

    document.querySelectorAll('.vc-timeline-step').forEach(step => {
      const card = step.querySelector('.vc-step-card');

      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          containerAnimation: hTween,
          start: 'left 88%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="vc-section-timeline" id="timeline-section">
      <div className="vc-container">
        <div className="vc-timeline-header vc-gs-reveal">
          <span className="vc-eyebrow">The Process</span>
          <h2 className="vc-timeline-title">How The Program Works</h2>
        </div>
      </div>
      <div className="vc-timeline-wrapper">
        <div ref={trackRef} className="vc-horizontal-track" id="horizontal-track">
          <div className="vc-timeline-spine">
            <div className="vc-spine-track"></div>
            <div ref={progressBarRef} className="vc-spine-progress" id="timeline-progress-bar"></div>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="vc-timeline-step">
              <div className="vc-step-card">
                <span className="vc-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
