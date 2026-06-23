import testimonialQuoteMark from '@assets/images/testimonial-quote-mark.png';

export type ClientFeedbackItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIAL_QUOTE_MARK = {
  src: testimonialQuoteMark,
  width: 43,
  height: 38,
  alt: 'Quotation mark',
} as const;

export const CLIENT_FEEDBACK: ClientFeedbackItem[] = [
  {
    id: 'john-d-retail',
    quote:
      'Working with USA Brokers Inc. was one of the best decisions I made for my business. They were knowledgeable, responsive, and guided me through every step of the process. I always felt informed and supported.',
    name: 'John D.',
    role: 'Logistics Manager, Retail Company',
  },
  {
    id: 'mitchell-d',
    quote:
      'Professional, reliable, and incredibly easy to work with. They took the time to understand my needs and found the right solution without any pressure. Highly recommended.',
    name: 'Mitchell D.',
    role: 'Operations Director, Food & Beverage',
  },
  {
    id: 'david-g',
    quote:
      'I appreciate the honesty and transparency throughout the entire process. Every question was answered quickly, and I felt confident knowing I had experienced professionals on my side.',
    name: 'David G.',
    role: 'Supply Chain Manager, Dairy Company',
  },
  {
    id: 'john-d-national',
    quote:
      'Exceptional customer service from start to finish. The team was attentive, detail-oriented, and genuinely cared about helping me achieve the best outcome.',
    name: 'John D.',
    role: 'Logistics Manager, National Distribution Company',
  },
  {
    id: 'jennifer-t',
    quote:
      'USA Brokers Inc. exceeded my expectations. They made what could have been a stressful process feel simple and straightforward. I would gladly work with them again.',
    name: 'Jennifer T.',
    role: 'Owner, Transportation & Logistics Company',
  },
  {
    id: 'robert-w',
    quote:
      'I was impressed by their professionalism and industry knowledge. They provided clear guidance, communicated consistently, and made me feel like a valued client throughout the entire experience.',
    name: 'Robert W.',
    role: 'Transportation Manager, Food & Beverage Company',
  },
];
