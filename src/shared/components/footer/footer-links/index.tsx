import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import icAddress from '@assets/images/ic-address.png';
import icMail from '@assets/images/ic-mail.png';
import icPhone from '@assets/images/ic-phone.png';
import { Text } from '@/shared/components';
import { getHomeSectionHref, handleHomeSectionClick } from '@/shared/utils/scroll-to-section';
import { FOOTER_COMPANY_LINKS, FOOTER_CONTACT } from './constants';
import styles from './styles.module.scss';

const CONTACT_ICONS = {
  mail: icMail,
  phone: icPhone,
  address: icAddress,
} as const;

export const FooterLinks: FC = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles['footer-links']}>
      <nav className={styles['footer-links-company']} aria-labelledby="footer-company-heading">
        <Text
          as="p"
          id="footer-company-heading"
          family="poppins"
          weight="regular"
          className={styles['footer-links-column-title']}
        >
          Company
        </Text>

        <ul className={styles['footer-links-company-list']}>
          {FOOTER_COMPANY_LINKS.map(({ id, label, sectionId }) => (
            <li key={id}>
              <a
                href={getHomeSectionHref(sectionId, pathname)}
                className={styles['footer-links-company-link']}
                onClick={handleHomeSectionClick(sectionId, pathname)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles['footer-links-contact']} aria-labelledby="footer-contact-heading">
        <Text
          as="p"
          id="footer-contact-heading"
          family="poppins"
          weight="regular"
          className={styles['footer-links-column-title']}
        >
          Drop us a line
        </Text>

        <ul className={styles['footer-links-contact-list']}>
          <li className={styles['footer-links-contact-item']}>
            <img
              src={CONTACT_ICONS.mail}
              alt="Email"
              className={styles['footer-links-contact-icon']}
              width={26}
              height={26}
              loading="lazy"
              decoding="async"
            />
            <a className={styles['footer-links-contact-link']} href={`mailto:${FOOTER_CONTACT.email}`}>
              {FOOTER_CONTACT.email}
            </a>
          </li>
          <li className={styles['footer-links-contact-item']}>
            <img
              src={CONTACT_ICONS.phone}
              alt="Phone"
              className={styles['footer-links-contact-icon']}
              width={26}
              height={26}
              loading="lazy"
              decoding="async"
            />
            <a className={styles['footer-links-contact-link']} href={FOOTER_CONTACT.phoneHref}>
              {FOOTER_CONTACT.phone}
            </a>
          </li>
          <li className={styles['footer-links-contact-item']}>
            <img
              src={CONTACT_ICONS.address}
              alt="Address"
              className={styles['footer-links-contact-icon']}
              width={26}
              height={26}
              loading="lazy"
              decoding="async"
            />
            <span className={styles['footer-links-contact-text']}>{FOOTER_CONTACT.address}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
