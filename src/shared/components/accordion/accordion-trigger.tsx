import type { FC, HTMLAttributes, ReactNode } from 'react';
import arrowUpRight from '@assets/images/arrow-up-right.png';
import { classNames } from '@/shared/utils/class-names';
import { useAccordionContext } from './accordion-context';
import styles from './styles.module.scss';

const ACCORDION_ARROW_SIZE_PX = 24 as const;

type AccordionTriggerProps = {
  itemId: string;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

function AccordionArrowIcon({ expanded }: { expanded: boolean }) {
  return (
    <span className={classNames(styles['accordion-icon'], expanded && styles['accordion-icon--expanded'])} aria-hidden>
      <img
        className={styles['accordion-icon-image']}
        src={arrowUpRight}
        alt="Expand or collapse section"
        width={ACCORDION_ARROW_SIZE_PX}
        height={ACCORDION_ARROW_SIZE_PX}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

export const AccordionTrigger: FC<AccordionTriggerProps> = ({ itemId, children, className, ...rest }) => {
  const { expandedIds, toggle } = useAccordionContext();
  const isExpanded = expandedIds.has(itemId);
  const triggerId = `${itemId}-trigger`;
  const panelId = `${itemId}-panel`;

  return (
    <h3 className={styles['accordion-trigger-wrap']}>
      <button
        type="button"
        id={triggerId}
        className={classNames(styles['accordion-trigger'], className)}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => toggle(itemId)}
        {...rest}
      >
        <span className={styles['accordion-trigger-label']}>{children}</span>
        <AccordionArrowIcon expanded={isExpanded} />
      </button>
    </h3>
  );
};
