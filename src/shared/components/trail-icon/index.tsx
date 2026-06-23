import type { FC, HTMLAttributes } from 'react';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type TrailIconVariant = 'primary' | 'secondary';

export type TrailIconProps = {
  variant?: TrailIconVariant;
  loading?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export const TrailIcon: FC<TrailIconProps> = ({
  variant = 'primary',
  loading = false,
  className: classNameProp,
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={classNames(
        styles['trail-icon'],
        styles[`trail-icon--${variant}`],
        loading && styles['trail-icon--loading'],
        classNameProp
      )}
      aria-hidden
    >
      <svg className={styles['trail-icon-svg']} width={12} height={12} viewBox="0 0 18 18" fill="none">
        <circle className={styles['trail-icon-circle']} cx={9} cy={9} r={6.5} stroke="currentColor" strokeWidth={1.5} />
      </svg>
    </span>
  );
};
