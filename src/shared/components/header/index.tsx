import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '@assets/images/logo.png';
import { CONTACT_FORM_SECTION_ID } from '@modules/contact-us/constants';
import { getHomeSectionHref, handleHomeSectionClick } from '@/shared/utils/scroll-to-section';

import styles from './styles.module.scss';
import { Button } from '../button';

const LOGO = {
  width: 375,
  height: 192,
  alt: 'USA Brokers Inc.',
} as const;

const LEGAL_PATHS = new Set(['/terms', '/privacy']);

export const Header: FC = () => {
  const { pathname } = useLocation();
  const isLegalPage = LEGAL_PATHS.has(pathname);
  const contactHref = getHomeSectionHref(CONTACT_FORM_SECTION_ID, pathname);

  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <img
          src={logo}
          alt={LOGO.alt}
          className={styles['header-logo']}
          width={LOGO.width}
          height={LOGO.height}
          loading="eager"
          decoding="async"
        />

        <Button
          text="Talk to an Expert"
          variant={isLegalPage ? 'accent' : 'default'}
          href={contactHref}
          onClick={handleHomeSectionClick(CONTACT_FORM_SECTION_ID, pathname)}
        />
      </div>
    </header>
  );
};
