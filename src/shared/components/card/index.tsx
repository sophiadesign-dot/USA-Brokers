import type { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type CardProps = {
  children?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>;

export const Card: FC<CardProps> = ({ children, className: classNameProp, ...rest }) => {
  return (
    <div className={classNames(styles.card, classNameProp)} {...rest}>
      {children}
    </div>
  );
};
