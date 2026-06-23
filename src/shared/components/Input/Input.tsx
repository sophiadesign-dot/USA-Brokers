import { forwardRef } from 'react';
import type { ForwardRefRenderFunction, InputHTMLAttributes, Ref, TextareaHTMLAttributes } from 'react';
import { Text } from '../text';
import { classNames } from '@/shared/utils/class-names';
import styles from './Input.module.scss';

type InputProps = {
  id: string;
  label?: string;
  variant?: 'default' | 'soft';
  inputClassName?: string;
  error?: string;
} & (
  | (InputHTMLAttributes<HTMLInputElement> & { rows?: undefined })
  | (TextareaHTMLAttributes<HTMLTextAreaElement> & { rows: number })
);

export type { InputProps };

const InputImpl: ForwardRefRenderFunction<HTMLInputElement | HTMLTextAreaElement, InputProps> = (
  { id, label, variant = 'default', className: classNameProp = '', inputClassName = '', rows, error, ...rest },
  ref
) => {
  const errorId = error ? `${id}-error` : undefined;
  const controlClassName = classNames(
    styles['input-control'],
    variant === 'soft' && styles['input-control--variant-soft'],
    inputClassName,
    error && styles['input-control--error']
  );
  const rootClassName = classNames(styles.input, classNameProp);

  return (
    <div className={rootClassName}>
      {label ? (
        <Text
          as="label"
          htmlFor={id}
          className={styles['input-label']}
          size="form-label"
          family="open-sans"
          color="body"
          weight="medium"
        >
          {label}
        </Text>
      ) : null}
      <div className={styles['input-shell']}>
        {rows != null && rows > 0 ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            id={id}
            rows={rows}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={classNames(controlClassName, (rest as TextareaHTMLAttributes<HTMLTextAreaElement>).className)}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className={classNames(controlClassName, (rest as InputHTMLAttributes<HTMLInputElement>).className)}
          />
        )}
        {error ? (
          <Text
            as="span"
            id={errorId}
            className={styles['input-error']}
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

InputImpl.displayName = 'Input';

export const Input = forwardRef(InputImpl);
