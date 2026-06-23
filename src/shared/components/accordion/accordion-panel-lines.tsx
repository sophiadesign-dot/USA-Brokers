import { useLayoutEffect, useState, type CSSProperties, type RefObject } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { splitTextIntoLines } from './split-text-into-lines';
import styles from './styles.module.scss';

type AccordionPanelLinesProps = {
  text: string;
  visible: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onLineCountChange?: (count: number) => void;
};

export function AccordionPanelLines({ text, visible, containerRef, onLineCountChange }: AccordionPanelLinesProps) {
  const [lines, setLines] = useState<string[]>([text]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateLines = () => {
      const style = window.getComputedStyle(container);
      const paddingInline = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
      const maxWidth = container.clientWidth - paddingInline;

      setLines(splitTextIntoLines(text, maxWidth, style.font, style.letterSpacing));
    };

    updateLines();

    const resizeObserver = new ResizeObserver(updateLines);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [text, containerRef]);

  useLayoutEffect(() => {
    onLineCountChange?.(lines.length);
  }, [lines.length, onLineCountChange]);

  return (
    <div
      className={classNames(
        styles['accordion-panel-content'],
        visible ? styles['accordion-panel-content--visible'] : styles['accordion-panel-content--hidden']
      )}
    >
      {lines.map((line, index) => (
        <span
          key={`${index}-${line}`}
          className={styles['accordion-panel-line']}
          style={
            {
              '--line-index': index,
              '--line-index-reverse': lines.length - 1 - index,
            } as CSSProperties
          }
        >
          <span className={styles['accordion-panel-line-text']}>{line}</span>
        </span>
      ))}
    </div>
  );
}
