import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ForwardRefRenderFunction, ForwardedRef, KeyboardEvent, MutableRefObject } from 'react';
import { Text } from '../text';
import { classNames } from '@/shared/utils/class-names';
import styles from './Dropdown.module.scss';

export type DropdownOption = { value: string; label: string };

export type DropdownProps = {
  id: string;
  label?: string;
  /** Text when no value is selected */
  placeholder?: string;
  options: DropdownOption[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
};

const assignRef = <T,>(node: T | null, ref: ForwardedRef<T>) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    (ref as MutableRefObject<T | null>).current = node;
  }
};

const DropdownImpl: ForwardRefRenderFunction<HTMLButtonElement, DropdownProps> = (
  {
    id,
    label,
    placeholder = 'Type of Freight',
    options,
    className: classNameProp = '',
    error,
    value = '',
    onChange,
    onBlur,
    disabled,
  },
  forwardedRef
) => {
  const reactId = useId();
  const listboxId = `${id}-listbox-${reactId}`;
  const errorId = error ? `${id}-error` : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const selectedLabel = options.find((o) => o.value === value)?.label;
  const displayText = selectedLabel ?? placeholder;
  const isPlaceholder = !selectedLabel;

  useEffect(() => {
    const unmountTimerRef: { id?: ReturnType<typeof setTimeout> } = {};

    if (open) {
      const mountFrame = requestAnimationFrame(() => {
        setPanelMounted(true);
        requestAnimationFrame(() => setPanelVisible(true));
      });
      return () => cancelAnimationFrame(mountFrame);
    }

    const hideFrame = requestAnimationFrame(() => {
      setPanelVisible(false);
      unmountTimerRef.id = window.setTimeout(() => {
        setPanelMounted(false);
      }, 320);
    });

    return () => {
      cancelAnimationFrame(hideFrame);
      if (unmountTimerRef.id != null) {
        window.clearTimeout(unmountTimerRef.id);
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: globalThis.MouseEvent) => {
      const el = e.target as Node;
      if (!rootRef.current?.contains(el)) {
        setOpen(false);
        setHighlightedIndex(-1);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open, onBlur]);

  const close = useCallback(() => {
    setOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const selectValue = useCallback(
    (next: string) => {
      onChange?.(next);
      close();
      onBlur?.();
      triggerRef.current?.focus();
    },
    [onChange, onBlur, close]
  );

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((wasOpen) => {
      if (wasOpen) {
        onBlur?.();
      }
      return !wasOpen;
    });
    setHighlightedIndex(-1);
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (open) {
          setHighlightedIndex((i) => Math.max(i - 1, 0));
        }
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (open && highlightedIndex >= 0 && options[highlightedIndex]) {
          selectValue(options[highlightedIndex].value);
        } else if (!open) {
          setOpen(true);
          setHighlightedIndex(0);
        }
        break;
      }
      case 'Escape': {
        if (open) {
          e.preventDefault();
          close();
          onBlur?.();
        }
        break;
      }
      case 'Tab': {
        if (open) {
          close();
          onBlur?.();
        }
        break;
      }
      default:
        break;
    }
  };

  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      assignRef(node, forwardedRef);
    },
    [forwardedRef]
  );

  return (
    <div ref={rootRef} className={classNames(styles.dropdown, classNameProp)}>
      {label ? (
        <Text
          as="label"
          htmlFor={id}
          id={`${id}-label`}
          className={styles['dropdown-label']}
          size="form-label"
          family="open-sans"
          color="body"
          weight="medium"
        >
          {label}
        </Text>
      ) : null}
      <div className={styles['dropdown-field']}>
        <button
          ref={setTriggerRef}
          type="button"
          id={id}
          className={classNames(
            styles['dropdown-trigger'],
            error && styles['dropdown-trigger--error'],
            disabled && styles['dropdown-trigger--disabled']
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          aria-expanded={panelMounted}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${id}-label` : undefined}
          disabled={disabled}
          onClick={toggleOpen}
          onKeyDown={onTriggerKeyDown}
        >
          <Text
            as="span"
            size="form-control"
            family="open-sans"
            color={isPlaceholder ? 'placeholder' : 'input'}
            weight="regular"
            className={styles['dropdown-value']}
          >
            {displayText}
          </Text>
          <span
            className={classNames(styles['dropdown-chevron'], panelMounted && styles['dropdown-chevron--open'])}
            aria-hidden
          >
            <svg width={20} height={20} viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 5.25L7 8.75l3.5-3.5"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {panelMounted ? (
          <ul
            id={listboxId}
            className={classNames(styles['dropdown-panel'], panelVisible && styles['dropdown-panel--visible'])}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : id}
          >
            {options.map((opt, index) => (
              <li
                key={opt.value}
                role="option"
                tabIndex={-1}
                aria-selected={value === opt.value}
                className={classNames(
                  styles['dropdown-option'],
                  index > 0 && styles['dropdown-option--divided'],
                  value === opt.value && styles['dropdown-option--selected'],
                  highlightedIndex === index && styles['dropdown-option--highlighted']
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectValue(opt.value)}
              >
                <Text
                  as="div"
                  size="form-control"
                  family="open-sans"
                  color="input"
                  weight="regular"
                  className={styles['dropdown-option-inner']}
                >
                  {opt.label}
                </Text>
              </li>
            ))}
          </ul>
        ) : null}

        {error ? (
          <Text
            as="span"
            id={errorId}
            className={styles['dropdown-error']}
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

DropdownImpl.displayName = 'Dropdown';

export const Dropdown = forwardRef(DropdownImpl);
