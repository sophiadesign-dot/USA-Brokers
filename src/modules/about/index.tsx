import { Fragment, type FC } from 'react';
import socialProofSrc from '@assets/images/about-social-proof.png';
import { ABOUT_SECTION_ID } from '@/shared/constants/page-sections';
import { SectionWrapper, Text } from '@/shared/components';
import styles from './styles.module.scss';

const ABOUT_BODY = [
  'At USA Brokers Inc., we provide reliable and efficient freight solutions for businesses across the nation. Our mission is simple: connect shippers with trusted carriers to ensure every load moves safely, on time, and with full transparency.',
  'With a strong network of vetted carriers and a commitment to clear communication, we deliver personalized logistics support for FTL, LTL, refrigerated, and expedited shipments.',
  "We believe in building long-term relationships based on trust, accountability, and consistent performance. Whether it's a single shipment or ongoing freight needs, our team works around the clock to keep your supply chain moving.",
] as const;

const ABOUT_STATS = [
  { value: '48', label: 'states serviced' },
  { value: '500,000+', label: 'carriers available through our network' },
  { value: '100%', label: 'Vetted & insured carriers' },
] as const;

const SOCIAL_IMAGE = {
  width: 280,
  height: 62,
  alt: '23k successful shipments',
} as const;

export const About: FC = () => {
  return (
    <SectionWrapper
      id={ABOUT_SECTION_ID}
      trailIconText="ABOUT US"
      trailIconVariant="secondary"
      paddingVariant="none"
      minHeight="auto"
      className={styles.about}
      aria-labelledby="about-heading"
      contentClassName={styles['about-content']}
    >
      <div className={styles['about-layout']}>
        <div className={styles['about-column']}>
          <Text
            as="h2"
            id="about-heading"
            size="about-headline"
            family="albert-sans"
            color="secondary"
            weight="medium"
            textTransform="uppercase"
            className={styles['about-headline']}
          >
            Reliable freight solutions for every shipment, across the nation
          </Text>
          <div className={styles['about-social']}>
            <img
              src={socialProofSrc}
              alt={SOCIAL_IMAGE.alt}
              className={styles['about-social-image']}
              width={SOCIAL_IMAGE.width}
              height={SOCIAL_IMAGE.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles['about-column']}>
          <div className={styles['about-body']}>
            {ABOUT_BODY.map((paragraph, index) => (
              <Text key={index} as="p" size="about-body" family="open-sans" color="about-body" weight="regular">
                {paragraph}
              </Text>
            ))}
          </div>

          <div className={styles['about-stats']}>
            {ABOUT_STATS.map((stat, index) => (
              <Fragment key={stat.value}>
                {index > 0 ? <div className={styles['about-stat-divider']} aria-hidden /> : null}
                <div className={styles['about-stat']}>
                  <Text
                    as="p"
                    size="stat-value"
                    family="albert-sans"
                    color="secondary"
                    weight="medium"
                    textTransform="uppercase"
                    className={styles['about-stat-value']}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    as="p"
                    size="stat-label"
                    family="open-sans"
                    color="secondary"
                    weight="regular"
                    className={styles['about-stat-label']}
                  >
                    {stat.label}
                  </Text>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
