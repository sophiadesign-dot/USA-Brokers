import type { FC, SVGAttributes } from 'react';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type CheckIconProps = Omit<SVGAttributes<SVGSVGElement>, 'children' | 'viewBox'>;

export const CheckIcon: FC<CheckIconProps> = ({ className: classNameProp, ...rest }) => {
  return (
    <svg
      {...rest}
      className={classNames(styles['check-icon'], classNameProp)}
      viewBox="0 0 14 11"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 5.25L5.5 9.75L13 1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
