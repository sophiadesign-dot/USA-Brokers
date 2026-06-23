import { ABOUT_SECTION_ID, FAQ_SECTION_ID } from '@/shared/constants/page-sections';
import { CONTACT_FORM_SECTION_ID } from '@modules/contact-us/constants';

export type FooterCompanyLink = {
  id: string;
  label: string;
  sectionId: string;
};

export const FOOTER_COMPANY_LINKS: FooterCompanyLink[] = [
  { id: 'about-us', label: 'About us', sectionId: ABOUT_SECTION_ID },
  { id: 'faq', label: 'FAQ', sectionId: FAQ_SECTION_ID },
  { id: 'contact-us', label: 'Contact us', sectionId: CONTACT_FORM_SECTION_ID },
];

export const FOOTER_CONTACT = {
  email: 'sales@theusabrokers.com',
  phone: '+1 (954) 899-4320',
  phoneHref: 'tel:+19548994320',
  address: '29 E Palatine Rd Prospect Heights, IL',
} as const;
