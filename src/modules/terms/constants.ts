import { FOOTER_CONTACT } from '@/shared/components/footer/footer-links/constants';

export const TERMS_LAST_UPDATED = 'June 2026';

export const TERMS_INTRO =
  'Welcome to USA Brokers Inc. By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use this website.';

export type TermsSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  listIntro?: string;
  list?: readonly string[];
  closingParagraph?: string;
};

export const TERMS_SECTIONS: readonly TermsSection[] = [
  {
    id: 'about-our-services',
    title: 'About Our Services',
    paragraphs: [
      'USA Brokers Inc. is a freight brokerage company that connects shippers with qualified motor carriers and transportation providers. We do not operate as a motor carrier and do not own transportation equipment unless otherwise stated.',
      'All freight transportation services are subject to separate agreements, quotations, and applicable laws and regulations.',
    ],
  },
  {
    id: 'use-of-the-website',
    title: 'Use of the Website',
    paragraphs: ['You agree to use this website only for lawful purposes and in accordance with these Terms.'],
    listIntro: 'You agree not to:',
    list: [
      'Use the website in any way that violates applicable laws or regulations.',
      'Attempt to gain unauthorized access to any part of the website.',
      'Interfere with the proper functioning of the website.',
      'Submit false, misleading, or fraudulent information.',
    ],
  },
  {
    id: 'quote-requests',
    title: 'Quote Requests',
    paragraphs: [
      'Any freight quote provided through this website is for informational purposes only and does not constitute a binding agreement.',
      'Rates, availability, transit times, and transportation services may change based on market conditions, carrier availability, shipment details, fuel costs, and other factors.',
      'A shipment is not considered accepted until confirmed by USA Brokers Inc.',
    ],
  },
  {
    id: 'customer-responsibilities',
    title: 'Customer Responsibilities',
    paragraphs: ['Customers are responsible for providing accurate information regarding:'],
    list: [
      'Pickup and delivery locations',
      'Shipment dimensions and weight',
      'Commodity descriptions',
      'Required handling instructions',
      'Any hazardous materials information',
    ],
    closingParagraph:
      'USA Brokers Inc. shall not be responsible for delays, additional charges, or service issues resulting from inaccurate information provided by the customer.',
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, USA Brokers Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of this website or any transportation services arranged through the company.',
      'Our total liability shall be limited to the extent permitted under applicable law and any governing transportation agreements.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website, including text, graphics, logos, images, designs, and other materials, is the property of USA Brokers Inc. and is protected by applicable copyright and intellectual property laws.',
      'You may not copy, reproduce, distribute, modify, or use any content without prior written permission.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    paragraphs: [
      'This website may contain links to third-party websites or services. USA Brokers Inc. is not responsible for the content, privacy practices, or operations of third-party websites.',
      'Accessing third-party websites is at your own risk.',
    ],
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    paragraphs: [
      'The information provided on this website is for general informational purposes only.',
      'While we strive to keep all information accurate and up to date, we make no warranties or representations regarding the completeness, accuracy, reliability, or availability of the website or its content.',
    ],
  },
  {
    id: 'changes-to-these-terms',
    title: 'Changes to These Terms',
    paragraphs: [
      'USA Brokers Inc. reserves the right to modify these Terms of Service at any time. Updated versions will be posted on this page with a revised effective date.',
      'Continued use of the website after any changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    paragraphs: [
      'These Terms shall be governed and interpreted in accordance with the laws of the United States and the State in which USA Brokers Inc. is registered, without regard to conflict of law principles.',
    ],
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    paragraphs: [
      'If you have any questions regarding these Terms of Service, please contact:',
      'USA Brokers Inc.',
      `Email: ${FOOTER_CONTACT.email}`,
      `Phone: ${FOOTER_CONTACT.phone}`,
    ],
  },
] as const;
