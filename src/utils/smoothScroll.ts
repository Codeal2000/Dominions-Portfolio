/**
 * High-performance smooth scrolling engine for cinematic portfolio navigation.
 * Uses requestAnimationFrame with custom cubic easing, target navbar compensation,
 * and section arrival highlight events.
 */

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  callback?: () => void;
}

// EaseInOutCubic: silky acceleration and deceleration for cinematic feel
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let activeAnimationId: number | null = null;

export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: SmoothScrollOptions = {}
): void {
  const { offset = 76, duration = 750, callback } = options;

  let targetY = 0;
  let targetElement: HTMLElement | null = null;

  if (typeof target === 'number') {
    targetY = Math.max(0, target);
  } else if (typeof target === 'string') {
    if (target === '#' || target === '' || target === '#top') {
      targetY = 0;
    } else {
      const cleanSelector = target.startsWith('#') ? target : `#${target}`;
      try {
        targetElement = document.querySelector(cleanSelector) as HTMLElement | null;
      } catch {
        targetElement = document.getElementById(target.replace(/^#/, ''));
      }
      if (!targetElement) return;
      const elementRect = targetElement.getBoundingClientRect();
      targetY = Math.max(0, window.pageYOffset + elementRect.top - offset);
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
    const elementRect = targetElement.getBoundingClientRect();
    targetY = Math.max(0, window.pageYOffset + elementRect.top - offset);
  }

  // Trigger arrival pulse and event on destination element
  if (targetElement) {
    targetElement.dispatchEvent(new CustomEvent('sectionNavigated', { bubbles: true }));
    targetElement.classList.add('section-arrival-pulse');
    setTimeout(() => {
      targetElement?.classList.remove('section-arrival-pulse');
    }, 1500);
  }

  // Cancel any ongoing smooth scroll animation
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }

  const startY = window.pageYOffset;
  const distance = targetY - startY;

  // Immediate finish if already virtually there
  if (Math.abs(distance) < 4) {
    window.scrollTo(0, targetY);
    if (callback) callback();
    return;
  }

  // Respect user prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY);
    if (callback) callback();
    return;
  }

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      activeAnimationId = null;
      if (callback) callback();
    }
  }

  activeAnimationId = requestAnimationFrame(step);
}

/**
 * Initializes global delegation for all anchor links pointing to `#id`
 */
export function initSmoothScroll(): () => void {
  const handleClick = (e: MouseEvent) => {
    // Only handle primary clicks without modifier keys
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();

    // Update URL hash smoothly
    if (window.history.pushState) {
      window.history.pushState(null, '', href);
    }

    smoothScrollTo(href);
  };

  document.addEventListener('click', handleClick, { passive: false });
  return () => {
    document.removeEventListener('click', handleClick);
  };
}
