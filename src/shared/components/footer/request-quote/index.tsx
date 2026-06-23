import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '@assets/images/logo.png';
import { CONTACT_FORM_SECTION_ID } from '@modules/contact-us/constants';
import { Button, Text } from '@/shared/components';
import { getHomeSectionHref, handleHomeSectionClick } from '@/shared/utils/scroll-to-section';
import { REQUEST_QUOTE_TAGLINE } from './constants';
import styles from './styles.module.scss';

const LOGO = {
  width: 375,
  height: 192,
  alt: 'USA Brokers Inc.',
} as const;

export const RequestQuote: FC = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles['request-quote']}>
      <img
        src={logo}
        alt={LOGO.alt}
        className={styles['request-quote-logo']}
        width={LOGO.width}
        height={LOGO.height}
        loading="lazy"
        decoding="async"
      />

      <Text
        as="p"
        size="s"
        family="open-sans"
        color="primary"
        weight="regular"
        className={styles['request-quote-tagline']}
      >
        {REQUEST_QUOTE_TAGLINE.line1}
        <br />
        {REQUEST_QUOTE_TAGLINE.line2}
      </Text>

      <Button
        variant="accent"
        text="Request a Quote"
        className={styles['request-quote-button']}
        href={getHomeSectionHref(CONTACT_FORM_SECTION_ID, pathname)}
        onClick={handleHomeSectionClick(CONTACT_FORM_SECTION_ID, pathname)}
        fullWidth
      />
    </div>
  );
};
