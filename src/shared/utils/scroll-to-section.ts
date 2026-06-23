export function getHomeSectionHref(sectionId: string, pathname: string) {
  return pathname === '/' ? `#${sectionId}` : `/#${sectionId}`;
}

export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${sectionId}`);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

export function handleHomeSectionClick(sectionId: string, pathname: string) {
  return (event: { preventDefault: () => void }) => {
    if (pathname !== '/') {
      return;
    }

    event.preventDefault();
    scrollToSection(sectionId);
  };
}
