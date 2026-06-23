import { AccordionItem } from './accordion-item';
import { AccordionPanel } from './accordion-panel';
import { AccordionRoot } from './accordion-root';
import { AccordionTrigger } from './accordion-trigger';

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
});
