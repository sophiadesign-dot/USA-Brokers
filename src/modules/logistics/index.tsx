import type { FC } from 'react';
import logisticsSectionBg from '@assets/images/logistics-section-bg.png';
import hubsImage from '@assets/images/logistics-hubs.png';
import nationwideImage from '@assets/images/logistics-nationwide.png';
import shippingImage from '@assets/images/logistics-shipping.png';
import { SectionWrapper, Text } from '@/shared/components';
import { LOGISTICS_ICON_IMAGE_SIDE_PX } from './constants';
import styles from './styles.module.scss';

type LogisticsFeature = {
  id: string;
  label: string;
  imageSrc: string;
};

const LOGISTICS_FEATURES: LogisticsFeature[] = [
  {
    id: 'nationwide-coverage',
    label: '48 states',
    imageSrc: nationwideImage,
  },
  {
    id: 'logistics-hubs',
    label: 'Major logistics hubs',
    imageSrc: hubsImage,
  },
  {
    id: 'commercial-freight-routes',
    label: 'High-demand commercial routes',
    imageSrc: shippingImage,
  },
];

export const Logistics: FC = () => {
  return (
    <SectionWrapper
      backgroundImage={logisticsSectionBg}
      backgroundImageFit="contain"
      className={styles.logistics}
      paddingVariant="none"
      minHeight="auto"
      aria-labelledby="logistics-heading"
      contentClassName={styles['logistics-inner']}
    >
      <div className={styles['logistics-intro']}>
        <Text
          as="h2"
          id="logistics-heading"
          size="logistics-title"
          family="albert-sans"
          color="primary"
          weight="regular"
          textTransform="uppercase"
        >
          We move freight anywhere in the USA
        </Text>
        <Text as="p" size="logistics-description" family="open-sans" color="logistics-description" weight="regular">
          From East Coast to West Coast, our network of verified carriers guarantees smooth and on-time delivery.
          Wherever your business operates — our coverage follows.
        </Text>
      </div>

      <div className={styles['logistics-panel']}>
        {LOGISTICS_FEATURES.map(({ id, label, imageSrc }) => (
          <div key={id} className={styles['logistics-feature']}>
            <div className={styles['logistics-icon']}>
              <img
                className={styles['logistics-icon-img']}
                src={imageSrc}
                alt={label}
                width={LOGISTICS_ICON_IMAGE_SIDE_PX}
                height={LOGISTICS_ICON_IMAGE_SIDE_PX}
                loading="lazy"
                decoding="async"
              />
            </div>
            <Text as="p" size="logistics-service" family="open-sans" color="primary" weight="regular">
              {label}
            </Text>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
