import { useRef, useMemo } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook to detect if a section is in (or near) the viewport.
 * Used to pause expensive infinite animations when off-screen.
 * 
 * @param margin - IntersectionObserver rootMargin (default 200px to preload before visible)
 */
export const useSectionInView = (margin: string = '200px') => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: margin as any, once: false });
  return { ref, isInView };
};

/**
 * Generate stable random particle positions.
 * Avoids recalculating Math.random() on every render.
 */
export const useParticlePositions = (count: number) => {
  return useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      left: `${((i * 17 + 7) % 100)}%`,
      top: `${((i * 31 + 13) % 100)}%`,
      duration: 3 + (i % 5) * 0.5,
      delay: (i % 7) * 0.3,
    })),
    [count]
  );
};
