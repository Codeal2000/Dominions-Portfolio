import React, { useEffect, useRef, useState } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  direction?: 'up' | 'fade' | 'slide-left' | 'slide-right';
  delay?: number;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  direction = 'up',
  delay = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNavigated, setIsNavigated] = useState<boolean>(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Listen for custom navigation event from smoothScroll
    const handleNavigated = () => {
      setIsVisible(true);
      setIsNavigated(true);
      setTimeout(() => setIsNavigated(false), 1400);
    };

    el.addEventListener('sectionNavigated', handleNavigated);

    // IntersectionObserver for scroll-driven reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, we can unobserve to save GPU cycles and maintain layout stability
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      el.removeEventListener('sectionNavigated', handleNavigated);
      observer.disconnect();
    };
  }, []);

  // Compute transform classes based on direction
  const getTransformClass = () => {
    if (isVisible) return 'opacity-100 translate-y-0 translate-x-0';
    switch (direction) {
      case 'slide-left':
        return 'opacity-0 -translate-x-8';
      case 'slide-right':
        return 'opacity-0 translate-x-8';
      case 'fade':
        return 'opacity-0';
      case 'up':
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{
        transitionDuration: '750ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative transform will-change-transform ${getTransformClass()} ${
        isNavigated ? 'ring-1 ring-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.12)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
