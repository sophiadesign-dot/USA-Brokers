import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { Text, type TextColor, type TextFamily, type TextSize, type TextWeight } from '../text';
import { TrailIcon, type TrailIconVariant } from '../trail-icon';
import styles from './styles.module.scss';

type ButtonOwnProps = {
  text?: string;
  variant?: 'default' | 'accent';
  size?: 'md';
  showTrailIcon?: boolean;
  trailIconVariant?: TrailIconVariant;
  fullWidth?: boolean;
  loading?: boolean;
  textSize?: TextSize;
  textFamily?: TextFamily;
  textColor?: TextColor;
  textWeight?: TextWeight;
};

export type ButtonProps = ButtonOwnProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string })
  );

function renderContent(
  children: ReactNode | undefined,
  text: string | undefined,
  textSize: TextSize,
  textFamily: TextFamily,
  textColor: TextColor,
  textWeight: TextWeight
) {
  if (children !== undefined && children !== null) {
    return (
      <Text
        size={textSize}
        family={textFamily}
        color={textColor}
        weight={textWeight}
        className={styles['button-label']}
      >
        {children}
      </Text>
    );
  }
  if (text !== undefined && text !== null && text !== '') {
    return (
      <Text
        size={textSize}
        family={textFamily}
        color={textColor}
        weight={textWeight}
        className={styles['button-label']}
      >
        {text}
      </Text>
    );
  }
  return null;
}

export const Button: FC<ButtonProps> = ({
  children,
  text,
  variant = 'default',
  size = 'md',
  showTrailIcon = true,
  trailIconVariant = 'primary',
  fullWidth = false,
  loading = false,
  textSize = 's',
  textFamily = 'open-sans',
  textColor = 'primary',
  textWeight = 'bold',
  className: classNameProp,
  href,
  type = 'button',
  ...rest
}) => {
  const mergedClassName = classNames(
    styles.button,
    styles[`button-size-${size}`],
    styles[`button-variant-${variant}`],
    fullWidth && styles['button-full-width'],
    loading && styles['button--loading'],
    classNameProp
  );

  const content = renderContent(children, text, textSize, textFamily, textColor, textWeight);
  const icon = showTrailIcon ? (
    <TrailIcon variant={trailIconVariant} loading={loading} className={styles['button-icon']} />
  ) : null;

  if (href) {
    const anchorRest = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

    return (
      <a href={href} className={mergedClassName} {...anchorRest}>
        {content}
        {icon}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      className={mergedClassName}
      disabled={buttonRest.disabled || loading}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {content}
      {icon}
    </button>
  );
};
