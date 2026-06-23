import type { ElementType, FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type TextSize =
  | 'xs'
  | 's'
  | 'm'
  | 'lead'
  | 'display'
  | 'about-headline'
  | 'logistics-title'
  | 'logistics-description'
  | 'logistics-service'
  | 'services-headline'
  | 'services-card-title'
  | 'services-card-description'
  | 'benefits-headline'
  | 'benefits-card-number'
  | 'benefits-card-title'
  | 'benefits-card-description'
  | 'questions-headline'
  | 'questions-description'
  | 'clients-feedback-headline'
  | 'clients-feedback-quote'
  | 'clients-feedback-name'
  | 'clients-feedback-role'
  | 'faq-headline'
  | 'about-body'
  | 'stat-value'
  | 'stat-label'
  | 'form-label'
  | 'form-control'
  | 'form-caption'
  | 'form-error'
  | 'trail';

export type TextFamily = 'open-sans' | 'albert-sans' | 'poppins' | 'plus-jakarta-sans';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'soft'
  | 'body'
  | 'muted'
  | 'about-body'
  | 'input'
  | 'input-soft'
  | 'placeholder'
  | 'error'
  | 'link'
  | 'logistics-description'
  | 'services-card-title'
  | 'services-description'
  | 'questions-description'
  | 'clients-feedback-text'
  | 'clients-feedback-role';
export type TextWeight = 'thick' | 'medium' | 'bold' | 'regular';
export type TextTransform = 'none' | 'uppercase';

type TextOwnProps = {
  as?: ElementType;
  size?: TextSize;
  family?: TextFamily;
  color?: TextColor;
  weight?: TextWeight;
  textTransform?: TextTransform;
  children: ReactNode;
  className?: string;
};

export type TextProps = TextOwnProps &
  Omit<HTMLAttributes<HTMLElement>, 'as' | 'children' | 'className' | 'color' | 'textTransform' | 'size'> & {
    /** Passed through when `as="label"` */
    htmlFor?: string;
  };

export const Text: FC<TextProps> = ({
  as: Comp = 'span',
  size = 's',
  family = 'open-sans',
  color = 'primary',
  weight = 'bold',
  textTransform = 'none',
  children,
  className: classNameProp,
  ...rest
}) => {
  const mergedClassName = classNames(
    styles.text,
    styles[`text-size-${size}`],
    styles[`text-family-${family}`],
    styles[`text-color-${color}`],
    styles[`text-weight-${weight}`],
    textTransform === 'uppercase' && styles['text-uppercase'],
    classNameProp
  );

  return (
    <Comp className={mergedClassName} {...rest}>
      {children}
    </Comp>
  );
};
