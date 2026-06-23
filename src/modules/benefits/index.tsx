import type { CSSProperties, FC } from 'react';
import { SectionWrapper, Text } from '@/shared/components';
import { classNames } from '@/shared/utils/class-names';
import { BENEFITS } from './constants';
import styles from './styles.module.scss';

export const Benefits: FC = () => {
  return (
    <SectionWrapper
      trailIconText="BENEFITS"
      trailIconVariant="secondary"
      paddingVariant="none"
      minHeight="auto"
      className={styles.benefits}
      aria-labelledby="benefits-heading"
      contentClassName={styles['benefits-content']}
    >
      <Text
        as="h2"
        id="benefits-heading"
        size="benefits-headline"
        family="albert-sans"
        color="secondary"
        weight="medium"
        textTransform="uppercase"
        className={styles['benefits-headline']}
      >
        Why choose us
      </Text>

      <div className={styles['benefits-grid']}>
        {BENEFITS.map(({ id, number, title, description, variant, imageSrc, objectPosition }) => {
          const isFeatured = variant === 'featured';
          const imageStyle: CSSProperties | undefined = objectPosition ? { objectPosition } : undefined;

          return (
            <article
              key={id}
              className={classNames(styles['benefits-card'], isFeatured && styles['benefits-card--featured'])}
            >
              {isFeatured && imageSrc ? (
                <img
                  className={styles['benefits-card-image']}
                  src={imageSrc}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  style={imageStyle}
                />
              ) : null}

              {isFeatured ? <div className={styles['benefits-card-overlay']} aria-hidden /> : null}

              <Text
                as="p"
                size="benefits-card-number"
                family="plus-jakarta-sans"
                color={isFeatured ? 'primary' : 'secondary'}
                weight="bold"
                className={styles['benefits-card-number']}
              >
                {number}.
              </Text>

              <div className={styles['benefits-card-copy']}>
                <Text
                  as="h3"
                  size="benefits-card-title"
                  family="albert-sans"
                  color={isFeatured ? 'primary' : 'services-card-title'}
                  weight="regular"
                  className={styles['benefits-card-title']}
                >
                  {title}
                </Text>
                <Text
                  as="p"
                  size="benefits-card-description"
                  family="open-sans"
                  color={isFeatured ? 'primary' : 'services-description'}
                  weight="regular"
                  className={styles['benefits-card-description']}
                >
                  {description}
                </Text>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
