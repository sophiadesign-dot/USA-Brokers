import { FOOTER_CONTACT } from '@/shared/components/footer/footer-links/constants';

export const PRIVACY_LAST_MODIFIED = 'June 2026';

export const PRIVACY_INTRO =
  'USA Brokers Inc. ("Company," "we," "our," or "us") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our website.';

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  listIntro?: string;
  list?: readonly string[];
  secondaryListIntro?: string;
  secondaryList?: readonly string[];
  closingParagraph?: string;
};

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    listIntro: 'When you submit a quote request, contact form, or otherwise interact with our website, we may collect:',
    list: [
      'Full Name',
      'Email Address',
      'Phone Number',
      'Company Name',
      'Shipping Information',
      'Origin and Destination Locations',
      'Any additional information you voluntarily provide',
    ],
    secondaryListIntro: 'We may also automatically collect technical information such as:',
    secondaryList: ['IP Address', 'Browser Type', 'Device Information', 'Website Usage Data'],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    listIntro: 'We use the information we collect to:',
    list: [
      'Provide freight brokerage and logistics services',
      'Respond to quote requests and inquiries',
      'Communicate regarding shipments and transportation services',
      'Improve our website and customer experience',
      'Comply with legal and regulatory requirements',
    ],
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    paragraphs: ['USA Brokers Inc. does not sell, rent, or trade your personal information.'],
    listIntro: 'We may share information with:',
    list: [
      'Carriers and transportation partners',
      'Service providers assisting with website operations',
      'Government authorities when required by law',
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    paragraphs: [
      'We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, or misuse.',
      'However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'Our website may use cookies and similar technologies to improve functionality, analyze website traffic, and enhance user experience.',
      'You may disable cookies through your browser settings.',
    ],
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    paragraphs: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    listIntro: 'Depending on your location and applicable laws, you may have the right to:',
    list: [
      'Access your personal information',
      'Request corrections to inaccurate information',
      'Request deletion of your personal information',
      'Opt out of certain communications',
    ],
    closingParagraph: 'To exercise these rights, please contact us using the information below.',
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    paragraphs: [
      'If you have any questions regarding this Privacy Policy or our privacy practices, please contact:',
      'USA Brokers Inc.',
      `Email: ${FOOTER_CONTACT.email}`,
      `Phone: ${FOOTER_CONTACT.phone}`,
    ],
  },
  {
    id: 'changes-to-this-privacy-policy',
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date.',
    ],
  },
] as const;
