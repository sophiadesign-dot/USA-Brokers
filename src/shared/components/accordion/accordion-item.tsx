import type { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { useAccordionContext } from './accordion-context';
import styles from './styles.module.scss';

type AccordionItemProps = {
  id: string;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'id'>;

export const AccordionItem: FC<AccordionItemProps> = ({ id, children, className, ...rest }) => {
  const { expandedIds } = useAccordionContext();
  const isExpanded = expandedIds.has(id);

  return (
    <div
      className={classNames(styles['accordion-item'], isExpanded && styles['accordion-item--expanded'], className)}
      data-expanded={isExpanded}
      {...rest}
    >
      {children}
    </div>
  );
};
