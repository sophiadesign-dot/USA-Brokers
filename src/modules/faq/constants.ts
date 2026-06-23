export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'freight-types',
    question: 'What types of freight do you handle?',
    answer:
      "We provide transportation solutions for a wide range of freight, including full truckload (FTL), less-than-truckload (LTL), refrigerated freight, flatbed shipments, oversized loads, and specialized cargo. Whether you're moving a single shipment or managing ongoing logistics operations, our team works closely with you to ensure your freight is delivered safely, efficiently, and on schedule.",
  },
  {
    id: 'shipping-quote',
    question: 'How fast can I get a shipping quote?',
    answer:
      'We understand that timing is critical in logistics. Most quotes are provided within a few hours, and many can be delivered even sooner. Our team responds quickly to every request, ensuring you receive competitive pricing and transportation options without unnecessary delays.',
  },
  {
    id: 'licensed-insured',
    question: 'Are you licensed and insured?',
    answer:
      'Yes. We work exclusively with qualified, licensed, and insured carriers that meet our strict standards for safety, compliance, and reliability. Protecting your freight and providing peace of mind throughout the shipping process is one of our highest priorities.',
  },
  {
    id: 'carrier-selection',
    question: 'How do you select your carriers?',
    answer:
      "Every carrier in our network is carefully vetted based on safety records, insurance coverage, performance history, and reliability. We don't believe in one-size-fits-all solutions — each shipment is matched with the carrier best suited to your specific freight requirements, transit time, and budget.",
  },
  {
    id: 'shipment-tracking',
    question: 'Do you offer shipment tracking?',
    answer:
      'Absolutely. Our team remains available to answer questions, coordinate logistics, and ensure you stay informed from pickup to final delivery.',
  },
  {
    id: 'book-load',
    question: 'How do I book a load with USA BROKERS INC?',
    answer:
      "It's simple — just request a quote through our website, call us directly, or email our team. We'll confirm details and match you with the right carrier.",
  },
];
