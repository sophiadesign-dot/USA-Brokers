import type { FC } from 'react';
import { SectionWrapper, Text } from '@/shared/components';
import { SERVICES, SERVICES_ICON_SIZE_PX } from './constants';
import styles from './styles.module.scss';

export const Services: FC = () => {
  return (
    <SectionWrapper
      trailIconText="OUR SERVICES"
      trailIconVariant="secondary"
      paddingVariant="none"
      minHeight="auto"
      className={styles.services}
      aria-labelledby="services-heading"
      contentClassName={styles['services-content']}
    >
      <Text
        as="h2"
        id="services-heading"
        size="services-headline"
        family="albert-sans"
        color="secondary"
        weight="medium"
        textTransform="uppercase"
        className={styles['services-headline']}
      >
        Your freight, our services
      </Text>

      <div className={styles['services-grid']}>
        {SERVICES.map(({ id, title, description, iconSrc }) => (
          <article key={id} className={styles['services-card']}>
            <div className={styles['services-card-icon']}>
              <img
                className={styles['services-card-icon-img']}
                src={iconSrc}
                alt={title}
                width={SERVICES_ICON_SIZE_PX}
                height={SERVICES_ICON_SIZE_PX}
                loading="lazy"
                decoding="async"
              />
            </div>
            <Text
              as="h3"
              size="services-card-title"
              family="plus-jakarta-sans"
              color="services-card-title"
              weight="medium"
              className={styles['services-card-title']}
            >
              {title}
            </Text>
            <Text
              as="p"
              size="services-card-description"
              family="open-sans"
              color="services-description"
              weight="regular"
            >
              {description}
            </Text>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};
