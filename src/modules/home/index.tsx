import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '@/shared/components';
import { Main } from '../main';
import { About } from '../about';
import { Logistics } from '../logistics';
import { Services } from '../services';
import { Benefits } from '../benefits';
import { OurClientsFeedback } from '../our-clients-feedback';
import { ContactUs } from '../contact-us';
import { Faq } from '../faq';
import { Questions } from '../questions';
import styles from './styles.module.scss';

export const Home: FC = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.hash.replace(/^#/, '');

    if (!sectionId) {
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash]);

  return (
    <>
      <Header />

      <main className={styles.home}>
        <Main />
        <About />
        <Logistics />
        <Services />
        <Questions />
        <Benefits />
        <OurClientsFeedback />
        <Faq />
        <ContactUs />
      </main>

      <Footer />
    </>
  );
};
