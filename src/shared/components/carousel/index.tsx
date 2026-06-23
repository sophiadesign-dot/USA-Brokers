import type { HTMLAttributes, ReactNode } from 'react';
import arrowUpRight from '@assets/images/arrow-up-right.png';
import { classNames } from '@/shared/utils/class-names';
import { useCarousel, type UseCarouselResult } from './use-carousel';
import styles from './styles.module.scss';

const CAROUSEL_NAV_ARROW_SIZE_PX = 31 as const;

type CarouselNavProps = {
  carousel: UseCarouselResult;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
};

function CarouselArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <img
      className={classNames(styles['carousel-nav-icon'], direction === 'prev' && styles['carousel-nav-icon--prev'])}
      src={arrowUpRight}
      alt={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      width={CAROUSEL_NAV_ARROW_SIZE_PX}
      height={CAROUSEL_NAV_ARROW_SIZE_PX}
      loading="lazy"
      decoding="async"
    />
  );
}

function CarouselNav({
  carousel,
  className,
  prevLabel = 'Previous slide',
  nextLabel = 'Next slide',
}: CarouselNavProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = carousel;

  return (
    <div className={classNames(styles['carousel-nav'], className)} role="group" aria-label="Carousel navigation">
      <button
        type="button"
        className={styles['carousel-nav-button']}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label={prevLabel}
      >
        <CarouselArrowIcon direction="prev" />
      </button>
      <button
        type="button"
        className={styles['carousel-nav-button']}
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label={nextLabel}
      >
        <CarouselArrowIcon direction="next" />
      </button>
    </div>
  );
}

export type CarouselProps<T> = {
  items: T[];
  renderSlide: (item: T, index: number) => ReactNode;
  getItemKey: (item: T) => string;
  header?: ReactNode;
  headerClassName?: string;
  slideClassName?: string;
  trackClassName?: string;
  trackAriaLabel?: string;
  showNav?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>;

export function Carousel<T>({
  items,
  renderSlide,
  getItemKey,
  header,
  headerClassName,
  slideClassName,
  trackClassName,
  trackAriaLabel,
  showNav = true,
  prevLabel,
  nextLabel,
  className,
  ...rest
}: CarouselProps<T>) {
  const carousel = useCarousel();
  const { trackRef, updateScrollState } = carousel;

  return (
    <div className={classNames(styles.carousel, className)} {...rest}>
      {header || showNav ? (
        <div className={headerClassName}>
          {header}
          {showNav ? <CarouselNav carousel={carousel} prevLabel={prevLabel} nextLabel={nextLabel} /> : null}
        </div>
      ) : null}

      <div
        ref={trackRef}
        className={classNames(styles['carousel-track'], trackClassName)}
        onScroll={updateScrollState}
        role="region"
        aria-roledescription="carousel"
        aria-label={trackAriaLabel}
      >
        {items.map((item, index) => (
          <div
            key={getItemKey(item)}
            className={classNames(styles['carousel-slide'], slideClassName)}
            data-carousel-slide
          >
            {renderSlide(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
