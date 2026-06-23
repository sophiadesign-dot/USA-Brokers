import type { FC } from 'react';
import questionsSectionBg from '@assets/images/questions-section-bg.png';
import { SectionWrapper, Text } from '@/shared/components';
import { QuestionsForm } from './questions-form';
import styles from './styles.module.scss';

export const Questions: FC = () => {
  return (
    <SectionWrapper
      backgroundImage={questionsSectionBg}
      backgroundImageFit="contain"
      paddingVariant="none"
      minHeight="auto"
      className={styles.questions}
      aria-labelledby="questions-heading"
      contentClassName={styles['questions-content']}
    >
      <div className={styles['questions-layout']}>
        <div className={styles['questions-copy']}>
          <Text
            as="h2"
            id="questions-heading"
            size="questions-headline"
            family="albert-sans"
            color="primary"
            weight="regular"
            textTransform="uppercase"
            className={styles['questions-headline']}
          >
            Need a freight quote or have questions?
          </Text>

          <Text
            as="p"
            size="questions-description"
            family="open-sans"
            color="questions-description"
            weight="regular"
            className={styles['questions-description']}
          >
            Leave your contact information and one of our logistics specialists will get back to you shortly.
          </Text>
        </div>

        <div className={styles['questions-form-wrap']}>
          <QuestionsForm />
        </div>
      </div>
    </SectionWrapper>
  );
};
