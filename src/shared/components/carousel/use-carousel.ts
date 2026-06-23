import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export type UseCarouselResult = {
  trackRef: RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  updateScrollState: () => void;
};

export function useCarousel(): UseCarouselResult {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollPrev(scrollLeft > 1);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scrollByDirection = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstSlide = track.querySelector<HTMLElement>('[data-carousel-slide]');
    const gapValue = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0');
    const slideStep = firstSlide ? firstSlide.offsetWidth + gapValue : track.clientWidth;

    track.scrollBy({ left: direction * slideStep, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;

    if (!track) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  return {
    trackRef,
    scrollPrev: () => scrollByDirection(-1),
    scrollNext: () => scrollByDirection(1),
    canScrollPrev,
    canScrollNext,
    updateScrollState,
  };
}
