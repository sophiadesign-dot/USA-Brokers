import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { CheckIcon } from '../check-icon';
import { Text } from '../text';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type CheckboxProps = {
  id: string;
  label: ReactNode;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>;

export const Checkbox: FC<CheckboxProps> = ({ id, label, error, className: classNameProp, ...rest }) => {
  const errorId = error ? `${id}-error` : undefined;
  const disabled = Boolean(rest.disabled);

  return (
    <div className={classNames(styles.checkbox, classNameProp)}>
      <div className={styles['checkbox-shell']}>
        <label
          className={classNames(styles['checkbox-row'], disabled && styles['checkbox-row--disabled'])}
          htmlFor={id}
        >
          <span className={classNames(styles['checkbox-box'], error && styles['checkbox-box--error'])}>
            <input
              id={id}
              type="checkbox"
              className={styles['checkbox-control']}
              aria-invalid={error ? true : undefined}
              aria-describedby={errorId}
              {...rest}
            />
            <span className={styles['checkbox-mark']} aria-hidden>
              <CheckIcon className={styles['checkbox-mark-icon']} />
            </span>
          </span>
          {typeof label === 'string' || typeof label === 'number' ? (
            <Text
              as="span"
              size="form-caption"
              family="open-sans"
              color="muted"
              weight="regular"
              className={styles['checkbox-caption']}
            >
              {label}
            </Text>
          ) : (
            <span className={styles['checkbox-caption']}>{label}</span>
          )}
        </label>
        {error ? (
          <Text
            as="span"
            id={errorId}
            className={styles['checkbox-error']}
            role="alert"
            size="form-error"
            family="open-sans"
            color="error"
            weight="bold"
          >
            {error}
          </Text>
        ) : null}
      </div>
    </div>
  );
};
