import licensedBondedBg from '@assets/images/benefits-licensed-bonded.png';
import nationwideNetworkBg from '@assets/images/benefits-nationwide-network.png';
import supportBg from '@assets/images/benefits-support.png';

export type BenefitVariant = 'featured' | 'standard';

export type BenefitItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  variant: BenefitVariant;
  imageSrc?: string;
  objectPosition?: string;
};

export const BENEFITS: BenefitItem[] = [
  {
    id: 'licensed-bonded',
    number: '01',
    title: 'Licensed & Bonded',
    description: 'Your freight is fully protected and insured.',
    variant: 'featured',
    imageSrc: licensedBondedBg,
    objectPosition: 'center',
  },
  {
    id: 'nationwide-network',
    number: '02',
    title: 'Nationwide Network',
    description: 'Thousands of reliable carriers, coast to coast.',
    variant: 'featured',
    imageSrc: nationwideNetworkBg,
    objectPosition: 'center',
  },
  {
    id: 'support',
    number: '03',
    title: '24/7 Support',
    description: 'Real people, always ready to assist.',
    variant: 'featured',
    imageSrc: supportBg,
    objectPosition: 'center',
  },
  {
    id: 'competitive-rates',
    number: '04',
    title: 'Competitive Rates',
    description: 'Strong carrier relationships mean better prices.',
    variant: 'standard',
  },
  {
    id: 'customized-solutions',
    number: '05',
    title: 'Customized Solutions',
    description: 'FTL, LTL, reefer, or expedited — tailored to you.',
    variant: 'standard',
  },
  {
    id: 'on-time-guarantee',
    number: '06',
    title: 'On-Time Guarantee',
    description: 'Reliability and punctuality on every load.',
    variant: 'standard',
  },
];
