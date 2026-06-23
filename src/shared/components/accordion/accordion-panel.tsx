import { useLayoutEffect, useRef, useState, type FC, type HTMLAttributes, type ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { AccordionPanelLines } from './accordion-panel-lines';
import { useAccordionContext } from './accordion-context';
import { useAccordionPanelMotion } from './use-accordion-panel-motion';
import styles from './styles.module.scss';

type AccordionPanelProps = {
  itemId: string;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>;

export const AccordionPanel: FC<AccordionPanelProps> = ({ itemId, children, className, ...rest }) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const { expandedIds } = useAccordionContext();
  const isExpanded = expandedIds.has(itemId);
  const { isPanelOpen, areLinesVisible } = useAccordionPanelMotion(isExpanded, lineCount);
  const isStringContent = typeof children === 'string';

  useLayoutEffect(() => {
    const element = measureRef.current;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(element.scrollHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, lineCount, isPanelOpen]);

  return (
    <div
      id={`${itemId}-panel`}
      role="region"
      aria-labelledby={`${itemId}-trigger`}
      aria-hidden={!isExpanded}
      className={classNames(styles['accordion-panel'], className)}
      style={{ height: isPanelOpen ? contentHeight : 0 }}
      {...rest}
    >
      <div ref={measureRef} className={styles['accordion-panel-inner']}>
        <div
          className={classNames(
            styles['accordion-panel-divider'],
            areLinesVisible && styles['accordion-panel-divider--visible']
          )}
          aria-hidden
        />

        {isStringContent ? (
          <AccordionPanelLines
            text={children}
            visible={areLinesVisible}
            containerRef={measureRef}
            onLineCountChange={setLineCount}
          />
        ) : (
          <div
            className={classNames(
              styles['accordion-panel-content'],
              styles['accordion-panel-content--plain'],
              areLinesVisible && styles['accordion-panel-content--visible']
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
