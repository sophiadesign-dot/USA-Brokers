import type { FC } from 'react';
import { FAQ_SECTION_ID } from '@/shared/constants/page-sections';
import { Accordion, SectionWrapper, Text, TrailIcon } from '@/shared/components';
import { FAQ_ITEMS } from './constants';
import styles from './styles.module.scss';

export const Faq: FC = () => {
  return (
    <SectionWrapper
      id={FAQ_SECTION_ID}
      paddingVariant="none"
      minHeight="auto"
      className={styles.faq}
      aria-labelledby="faq-heading"
      contentClassName={styles['faq-content']}
    >
      <div className={styles['faq-layout']}>
        <div className={styles['faq-copy']}>
          <div className={styles['faq-trail']}>
            <TrailIcon variant="secondary" />
            <Text
              as="span"
              size="trail"
              family="albert-sans"
              color="secondary"
              weight="regular"
              textTransform="uppercase"
            >
              FAQ
            </Text>
          </div>

          <Text
            as="h2"
            id="faq-heading"
            size="faq-headline"
            family="albert-sans"
            color="secondary"
            weight="medium"
            textTransform="uppercase"
            className={styles['faq-headline']}
          >
            Common questions
          </Text>
        </div>

        <Accordion className={styles['faq-accordion']} type="single">
          {FAQ_ITEMS.map(({ id, question, answer }) => (
            <Accordion.Item key={id} id={id}>
              <Accordion.Trigger itemId={id}>{question}</Accordion.Trigger>
              <Accordion.Panel itemId={id}>{answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
};
