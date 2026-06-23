import type { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children?: ReactNode;
};

function mergeRelForBlank(target: string | undefined, rel: string | undefined): string | undefined {
  if (target !== '_blank') {
    return rel;
  }
  const parts = new Set((rel?.split(/\s+/) ?? []).filter(Boolean));
  parts.add('noopener');
  parts.add('noreferrer');
  return [...parts].join(' ');
}

export const Link: FC<LinkProps> = ({ className, children, target, rel, href, ...rest }) => {
  return (
    <a
      href={href}
      className={classNames(styles.link, className)}
      target={target}
      rel={mergeRelForBlank(target, rel)}
      {...rest}
    >
      {children}
    </a>
  );
};
