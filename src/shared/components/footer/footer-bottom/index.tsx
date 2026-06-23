import type { FC, MouseEvent } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { scrollToTop } from '@/shared/utils/scroll-to-section';
import styles from './styles.module.scss';

const handleBackToTopClick = (event: MouseEvent<HTMLElement>) => {
  event.preventDefault();
  scrollToTop();
};

const copyrightYear = new Date().getFullYear();

export const FooterBottom: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames(styles['footer-bottom'], className)}>
      <div className={styles['footer-bottom-legal']}>
        <a href="/privacy" className={styles['footer-bottom-link']}>
          Privacy Policy
        </a>
        <a href="/terms" className={styles['footer-bottom-link']}>
          Terms of Service
        </a>
      </div>

      <a href="#" className={styles['footer-bottom-back-to-top']} onClick={handleBackToTopClick}>
        Back to top
        <span className={styles['footer-bottom-back-to-top-arrow']} aria-hidden>
          ↑
        </span>
      </a>

      <p className={styles['footer-bottom-copyright']}>© {copyrightYear} USA Brokers Inc. All Rights Reserved.</p>
    </div>
  );
};
