import type { FC } from 'react';
import { Footer, Header } from '@/shared/components';
import styles from '@modules/terms/styles.module.scss';
import { PRIVACY_INTRO, PRIVACY_LAST_MODIFIED, PRIVACY_SECTIONS } from './constants';

export const Privacy: FC = () => {
  return (
    <>
      <Header />

      <div className={styles.terms}>
        <main className={styles['terms-main']}>
          <header className={styles['terms-header']}>
            <h1 className={styles['terms-title']}>Privacy Policy</h1>

            <p className={styles['terms-updated']}>
              <span className={styles['terms-updated-label']}>Last modified:</span>
              <span className={styles['terms-updated-date']}>{PRIVACY_LAST_MODIFIED}</span>
            </p>

            <p className={styles['terms-intro']}>{PRIVACY_INTRO}</p>

            <hr className={styles['terms-divider']} aria-hidden />
          </header>

          <ol className={styles['terms-sections']}>
            {PRIVACY_SECTIONS.map((section, index) => (
              <li key={section.id} className={styles['terms-section']}>
                <h2 className={styles['terms-section-title']}>{section.title}</h2>

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

                {section.secondaryListIntro ? (
                  <p className={styles['terms-paragraph']}>{section.secondaryListIntro}</p>
                ) : null}

                {section.secondaryList ? (
                  <ul className={styles['terms-list']}>
                    {section.secondaryList.map((item) => (
                      <li key={item} className={styles['terms-list-item']}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.closingParagraph ? (
                  <p className={styles['terms-paragraph']}>{section.closingParagraph}</p>
                ) : null}

                {index < PRIVACY_SECTIONS.length - 1 ? <hr className={styles['terms-divider']} aria-hidden /> : null}
              </li>
            ))}
          </ol>
        </main>
      </div>

      <Footer />
    </>
  );
};
