import { createContext, useContext } from 'react';

export type AccordionType = 'single' | 'multiple';

export type AccordionContextValue = {
  type: AccordionType;
  expandedIds: Set<string>;
  toggle: (id: string) => void;
};

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion compound components must be used within Accordion');
  }

  return context;
}
