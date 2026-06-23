import { useCallback, useMemo, useState, type FC, type HTMLAttributes, type ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { AccordionContext, type AccordionType } from './accordion-context';
import styles from './styles.module.scss';

type AccordionRootProps = {
  children: ReactNode;
  className?: string;
  type?: AccordionType;
  defaultExpandedIds?: string[];
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>;

export const AccordionRoot: FC<AccordionRootProps> = ({
  children,
  className,
  type = 'single',
  defaultExpandedIds = [],
  ...rest
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(defaultExpandedIds));

  const toggle = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        const isExpanded = prev.has(id);

        if (type === 'single') {
          return isExpanded ? new Set<string>() : new Set([id]);
        }

        const next = new Set(prev);

        if (isExpanded) {
          next.delete(id);
        } else {
          next.add(id);
        }

        return next;
      });
    },
    [type]
  );

  const value = useMemo(() => ({ type, expandedIds, toggle }), [type, expandedIds, toggle]);

  return (
    <AccordionContext.Provider value={value}>
      <div className={classNames(styles.accordion, className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
