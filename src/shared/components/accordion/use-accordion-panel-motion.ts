import { useEffect, useState } from 'react';

const LINE_DURATION_MS = 400;
const LINE_STAGGER_MS = 70;

export function getLinesAnimationDuration(lineCount: number): number {
  if (lineCount <= 1) {
    return LINE_DURATION_MS;
  }

  return LINE_DURATION_MS + (lineCount - 1) * LINE_STAGGER_MS;
}

export function getPanelCollapseDelay(lineCount: number): number {
  if (lineCount <= 1) {
    return 180;
  }

  return (lineCount - 1) * LINE_STAGGER_MS;
}

export function useAccordionPanelMotion(isExpanded: boolean, lineCount: number) {
  const [isPanelOpen, setIsPanelOpen] = useState(isExpanded);
  const [areLinesVisible, setAreLinesVisible] = useState(isExpanded);

  useEffect(() => {
    if (isExpanded) {
      const openFrame = requestAnimationFrame(() => {
        setIsPanelOpen(true);

        requestAnimationFrame(() => {
          setAreLinesVisible(true);
        });
      });

      return () => cancelAnimationFrame(openFrame);
    }

    const hideLinesFrame = requestAnimationFrame(() => {
      setAreLinesVisible(false);
    });

    const closeTimer = window.setTimeout(() => {
      setIsPanelOpen(false);
    }, getPanelCollapseDelay(lineCount));

    return () => {
      cancelAnimationFrame(hideLinesFrame);
      window.clearTimeout(closeTimer);
    };
  }, [isExpanded, lineCount]);

  return { isPanelOpen, areLinesVisible };
}
