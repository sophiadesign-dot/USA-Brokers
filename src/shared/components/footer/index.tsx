import type { FC } from 'react';
import { FooterBottom } from './footer-bottom';
import { FooterLinks } from './footer-links';
import { RequestQuote } from './request-quote';
import styles from './styles.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-inner']}>
        <div className={styles['footer-content']}>
          <div className={styles['footer-content-top']}>
            <RequestQuote />
            <FooterLinks />
          </div>

          <FooterBottom className={styles['footer-content-bottom']} />
        </div>
      </div>
    </footer>
  );
};
