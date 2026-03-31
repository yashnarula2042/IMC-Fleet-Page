gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Intro Animation
lenis.stop(); // Disable scrolling during intro

const introTl = gsap.timeline({
  onComplete: () => {
    lenis.start(); // Enable scrolling when done
    // Force ScrollTrigger to refresh after intro is gone
    ScrollTrigger.refresh();
  }
});

introTl
  .to('#intro-loader', { opacity: 0, duration: 2, ease: 'power2.inOut', delay: 11 }) // Wait 11s for the headlights video to play, then fade out over 2s
  .set('#intro-loader', { display: 'none' }); // Hide completely after fade

// Video Scrubbing Logic
const video = document.getElementById('bg-video');

function setupVideoScrubbing() {
  const duration = video.duration;

  // Create a timeline that spans the entire scrollable height
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#smooth-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1, // Smooth scrubbing
    }
  });

  // Animate the video's currentTime property
  tl.to(video, {
    currentTime: duration,
    ease: 'none',
  });
}

// Check if metadata is already loaded (handles cached videos)
if (video.readyState >= 1) {
  setupVideoScrubbing();
} else {
  // Wait for video metadata to load before setting up ScrollTrigger
  video.addEventListener('loadedmetadata', setupVideoScrubbing);
}

// Force video load if it doesn't trigger automatically
video.load();

// Full Screen Menu Logic
const hamburger = document.querySelector('.hamburger');
const fullScreenMenu = document.querySelector('.full-screen-menu');
const menuLinks = document.querySelectorAll('.menu-link');

let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  hamburger.classList.toggle('active');
  fullScreenMenu.classList.toggle('active');
  
  const closeText = hamburger.querySelector('.close-text');
  if (closeText) {
    closeText.textContent = isMenuOpen ? 'CLOSE' : 'MENU';
  }
  
  if (isMenuOpen) {
    lenis.stop();
    // Animate menu items in
    gsap.fromTo('.menu-link', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.menu-text', 
      { y: '100%', scale: 0.85 }, 
      { y: '0%', scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.menu-info-block', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
    );
  } else {
    lenis.start();
    // Animate menu items out
    gsap.to('.menu-link', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.05
    });
    gsap.to('.menu-text', {
      y: '-100%',
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.in',
      stagger: 0.05
    });
    gsap.to('.menu-info-block', {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });
  }
}

hamburger.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isMenuOpen) toggleMenu();
  });
});

// Content Animations
const segments = document.querySelectorAll('.segment');

segments.forEach((segment, index) => {
  const elements = segment.querySelectorAll('h1, h2, p, a');
  
  // Default animation settings
  let animProps = {
    y: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.2,
    ease: 'power3.out'
  };

  // Segment-specific adjustments based on instructions
  switch(index + 1) {
    case 1: // SEGMENT 1 (0% → 15%) — INTRO
      animProps.ease = 'power1.inOut'; // slow easing
      animProps.duration = 2;
      break;
    case 2: // SEGMENT 2 (15% → 30%) — MOTION START
      // slight delay after entering viewport handled by start position
      break;
    case 3: // SEGMENT 3 (30% → 50%) — DETAIL SHOTS
      animProps.duration = 2; // slower fade-up
      animProps.ease = 'power2.out'; // refined easing
      break;
    case 4: // SEGMENT 4 (50% → 75%) — FULL REVEAL
      // fade + slight scale
      gsap.set(elements, { scale: 0.98 });
      animProps.scale = 1;
      animProps.ease = 'power1.out';
      break;
    case 5: // SEGMENT 5 (75% → 90%) — TRANSITION
      animProps.duration = 1.8; // soft fade-in
      break;
    case 6: // SEGMENT 6 (90% → 100%) — OUTRO / CTA
      animProps.ease = 'power1.out'; // clean fade-in
      break;
  }

  gsap.to(elements, {
    scrollTrigger: {
      trigger: segment,
      start: 'top 75%', // Trigger when top of segment is 75% down the viewport
      toggleActions: 'play none none reverse', // Play on enter, reverse on leave back
    },
    ...animProps
  });
});

// Fleet Showcase Horizontal Scroll
const fleetTrack = document.getElementById('fleet-track');
if (fleetTrack) {
  let getScrollAmount = () => {
    let trackWidth = fleetTrack.scrollWidth;
    return -(trackWidth - window.innerWidth);
  };

  gsap.to(fleetTrack, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: ".fleet-showcase",
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}
