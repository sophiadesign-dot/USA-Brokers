import type { FC } from 'react';
import clientsFeedbackSectionBg from '@assets/images/clients-feedback-section-bg.png';
import { Carousel, SectionWrapper, Text } from '@/shared/components';
import { CLIENT_FEEDBACK, TESTIMONIAL_QUOTE_MARK } from './constants';
import styles from './styles.module.scss';

export const OurClientsFeedback: FC = () => {
  return (
    <SectionWrapper
      backgroundImage={clientsFeedbackSectionBg}
      backgroundImageFit="contain"
      paddingVariant="none"
      minHeight="auto"
      className={styles['clients-feedback']}
      aria-labelledby="clients-feedback-heading"
      contentClassName={styles['clients-feedback-content']}
    >
      <Carousel
        className={styles['clients-feedback-carousel']}
        headerClassName={styles['clients-feedback-header']}
        header={
          <Text
            as="h2"
            id="clients-feedback-heading"
            size="clients-feedback-headline"
            family="albert-sans"
            color="primary"
            weight="medium"
            textTransform="uppercase"
          >
            What our clients are saying
          </Text>
        }
        items={CLIENT_FEEDBACK}
        getItemKey={({ id }) => id}
        slideClassName={styles['clients-feedback-slide']}
        trackAriaLabel="Client testimonials"
        renderSlide={({ quote, name, role }) => (
          <article className={styles['clients-feedback-card']}>
            <img
              className={styles['clients-feedback-quote-mark']}
              src={TESTIMONIAL_QUOTE_MARK.src}
              alt={TESTIMONIAL_QUOTE_MARK.alt}
              width={TESTIMONIAL_QUOTE_MARK.width}
              height={TESTIMONIAL_QUOTE_MARK.height}
              loading="lazy"
              decoding="async"
            />
            <Text
              as="blockquote"
              size="clients-feedback-quote"
              family="open-sans"
              color="clients-feedback-text"
              weight="regular"
              className={styles['clients-feedback-quote']}
            >
              {quote}
            </Text>
            <div className={styles['clients-feedback-author']}>
              <Text
                as="p"
                size="clients-feedback-name"
                family="albert-sans"
                color="clients-feedback-text"
                weight="medium"
                className={styles['clients-feedback-name']}
              >
                {name}
              </Text>
              <Text
                as="p"
                size="clients-feedback-role"
                family="open-sans"
                color="clients-feedback-role"
                weight="regular"
              >
                {role}
              </Text>
            </div>
          </article>
        )}
      />
    </SectionWrapper>
  );
};
