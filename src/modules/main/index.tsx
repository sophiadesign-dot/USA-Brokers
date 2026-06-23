import type { FC } from 'react';
import industrialBG from '@assets/images/industrial-port-bg.png';
import { SectionWrapper, Text } from '@/shared/components';
import styles from './styles.module.scss';
import { HeroFormCard } from './hero-form-card';

export const Main: FC = () => {
  return (
    <SectionWrapper
      backgroundImage={industrialBG}
      backgroundImageLoading="eager"
      overlay
      paddingVariant="none"
      minHeight="auto"
      className={styles['main-hero']}
      contentClassName={styles['main-hero-inner']}
    >
      <div className={styles['main-hero-layout']}>
        <div className={styles['main-hero-copy']}>
          <Text as="h1" size="display" family="albert-sans" color="primary" weight="bold" textTransform="uppercase">
            Your Trusted Freight Brokerage Across the USA
          </Text>
          <Text as="p" size="lead" family="open-sans" color="soft" weight="regular">
            Connecting shippers with trusted carriers nationwide. <br />
            No excuses. Just results.
          </Text>
        </div>
        <div className={styles['main-hero-card']}>
          <HeroFormCard />
        </div>
      </div>
    </SectionWrapper>
  );
};
