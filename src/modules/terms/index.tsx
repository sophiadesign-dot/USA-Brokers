import type { FC } from 'react';
import { Footer, Header } from '@/shared/components';
import { TERMS_INTRO, TERMS_LAST_UPDATED, TERMS_SECTIONS } from './constants';
import styles from './styles.module.scss';

export const Terms: FC = () => {
  return (
    <>
      <Header />

      <div className={styles.terms}>
        <main className={styles['terms-main']}>
          <header className={styles['terms-header']}>
            <h1 className={styles['terms-title']}>Terms of Service</h1>

            <p className={styles['terms-updated']}>
              <span className={styles['terms-updated-label']}>Last updated:</span>
              <span className={styles['terms-updated-date']}>{TERMS_LAST_UPDATED}</span>
            </p>

            <p className={styles['terms-intro']}>{TERMS_INTRO}</p>

            <hr className={styles['terms-divider']} aria-hidden />
          </header>

          <ol className={styles['terms-sections']}>
            {TERMS_SECTIONS.map((section, index) => (
              <li key={section.id} className={styles['terms-section']}>
                <h2 className={styles['terms-section-title']}>
                  {index + 1}. {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className={styles['terms-paragraph']}>
                    {paragraph}
                  </p>
                ))}

                {section.listIntro ? <p className={styles['terms-paragraph']}>{section.listIntro}</p> : null}

                {section.list ? (
                  <ul className={styles['terms-list']}>
                    {section.list.map((item) => (
                      <li key={item} className={styles['terms-list-item']}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.closingParagraph ? (
                  <p className={styles['terms-paragraph']}>{section.closingParagraph}</p>
                ) : null}

                {index < TERMS_SECTIONS.length - 1 ? <hr className={styles['terms-divider']} aria-hidden /> : null}
              </li>
            ))}
          </ol>
        </main>
      </div>

      <Footer />
    </>
  );
};
