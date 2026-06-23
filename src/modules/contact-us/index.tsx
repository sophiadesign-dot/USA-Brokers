import type { FC } from 'react';
import freightTerminalBg from '@assets/images/freight-terminal-bg.png';
import { CheckIcon, SectionWrapper, Text, TrailIcon } from '@/shared/components';
import { ContactForm } from './contact-form';
import { CONTACT_US_FEATURES, CONTACT_FORM_SECTION_ID } from './constants';
import styles from './styles.module.scss';

export const ContactUs: FC = () => {
  return (
    <SectionWrapper
      backgroundImage={freightTerminalBg}
      overlay
      overlayVariant="dark"
      paddingVariant="none"
      minHeight="auto"
      className={styles['contact-us']}
      aria-labelledby="contact-us-heading"
      contentClassName={styles['contact-us-content']}
    >
      <div className={styles['contact-us-layout']}>
        <div className={styles['contact-us-copy']}>
          <div className={styles['contact-us-trail']}>
            <TrailIcon variant="primary" />
            <Text
              as="span"
              size="trail"
              family="albert-sans"
              color="primary"
              weight="regular"
              textTransform="uppercase"
            >
              Contact us
            </Text>
          </div>

          <Text
            as="h2"
            id="contact-us-heading"
            size="display"
            family="albert-sans"
            color="primary"
            weight="bold"
            textTransform="uppercase"
            className={styles['contact-us-headline']}
          >
            Let&apos;s move your freight
          </Text>

          <ul className={styles['contact-us-features']}>
            {CONTACT_US_FEATURES.map((feature) => (
              <li key={feature} className={styles['contact-us-feature']}>
                <span className={styles['contact-us-feature-icon']} aria-hidden>
                  <CheckIcon className={styles['contact-us-feature-icon-svg']} />
                </span>
                <Text as="span" family="poppins" weight="regular" className={styles['contact-us-feature-text']}>
                  {feature}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div id={CONTACT_FORM_SECTION_ID} className={styles['contact-us-form-wrap']}>
          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  );
};
