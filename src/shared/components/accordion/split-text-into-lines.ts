export function splitTextIntoLines(text: string, maxWidth: number, font: string, letterSpacing: string): string[] {
  if (maxWidth <= 0) {
    return [text];
  }

  const probe = document.createElement('span');
  probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:${font};letter-spacing:${letterSpacing};`;
  document.body.appendChild(probe);

  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    probe.textContent = candidate;

    if (probe.offsetWidth > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  document.body.removeChild(probe);

  return lines.length > 0 ? lines : [text];
}
