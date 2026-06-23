import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, ForwardRefRenderFunction, ForwardedRef, KeyboardEvent, MutableRefObject } from 'react';
import { Text } from '../text';
import { useUsCityStateOptions } from '@/shared/hooks/use-us-city-state-options';
import { classNames } from '@/shared/utils/class-names';
import styles from './styles.module.scss';

export type CityStateAutocompleteProps = {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'soft';
};

const assignRef = <T,>(node: T | null, ref: ForwardedRef<T>) => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    (ref as MutableRefObject<T | null>).current = node;
  }
};

const CityStateAutocompleteImpl: ForwardRefRenderFunction<HTMLInputElement, CityStateAutocompleteProps> = (
  {
    id,
    label,
    placeholder,
    className: classNameProp = '',
    error,
    value = '',
    onChange,
    onBlur,
    disabled,
    variant = 'default',
  },
  forwardedRef
) => {
  const reactId = useId();
  const listboxId = `${id}-listbox-${reactId}`;
  const errorId = error ? `${id}-error` : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { getSuggestions, isReady } = useUsCityStateOptions();

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
    if (!open) {
      return;
    }

    const onDocMouseDown = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
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

  const updateSuggestions = useCallback(
    (query: string) => {
      if (!isReady) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      const nextSuggestions = getSuggestions(query);
      setSuggestions(nextSuggestions);
      setOpen(nextSuggestions.length > 0);
      setHighlightedIndex(nextSuggestions.length > 0 ? 0 : -1);
    },
    [getSuggestions, isReady]
  );

  const selectSuggestion = useCallback(
    (nextValue: string) => {
      onChange?.(nextValue);
      close();
      onBlur?.();
      inputRef.current?.focus();
    },
    [close, onBlur, onChange]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    onChange?.(nextValue);
    updateSuggestions(nextValue);
  };

  const handleFocus = () => {
    updateSuggestions(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        if (!open || suggestions.length === 0) {
          return;
        }

        event.preventDefault();
        setHighlightedIndex((index) => Math.min(index + 1, suggestions.length - 1));
        break;
      }
      case 'ArrowUp': {
        if (!open || suggestions.length === 0) {
          return;
        }

        event.preventDefault();
        setHighlightedIndex((index) => Math.max(index - 1, 0));
        break;
      }
      case 'Enter': {
        if (open && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          event.preventDefault();
          selectSuggestion(suggestions[highlightedIndex]);
        }
        break;
      }
      case 'Escape': {
        if (open) {
          event.preventDefault();
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

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(node, forwardedRef);
    },
    [forwardedRef]
  );

  return (
    <div ref={rootRef} className={classNames(styles.autocomplete, classNameProp)}>
      {label ? (
        <Text
          as="label"
          htmlFor={id}
          id={`${id}-label`}
          className={styles['autocomplete-label']}
          size="form-label"
          family="open-sans"
          color="body"
          weight="medium"
        >
          {label}
        </Text>
      ) : null}

      <div className={styles['autocomplete-field']}>
        <input
          ref={setInputRef}
          id={id}
          type="text"
          className={classNames(
            styles['autocomplete-control'],
            variant === 'soft' && styles['autocomplete-control--variant-soft'],
            error && styles['autocomplete-control--error']
          )}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          aria-expanded={panelMounted}
          aria-controls={panelMounted ? listboxId : undefined}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-activedescendant={open && highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
        />

        {panelMounted ? (
          <ul
            id={listboxId}
            className={classNames(styles['autocomplete-panel'], panelVisible && styles['autocomplete-panel--visible'])}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : id}
          >
            {suggestions.map((option, index) => (
              <li
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={value === option}
                className={classNames(
                  styles['autocomplete-option'],
                  index > 0 && styles['autocomplete-option--divided'],
                  highlightedIndex === index && styles['autocomplete-option--highlighted']
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(option)}
              >
                <Text
                  as="div"
                  size="form-control"
                  family="open-sans"
                  color="input"
                  weight="regular"
                  className={styles['autocomplete-option-inner']}
                >
                  {option}
                </Text>
              </li>
            ))}
          </ul>
        ) : null}

        {error ? (
          <Text
            as="span"
            id={errorId}
            className={styles['autocomplete-error']}
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

CityStateAutocompleteImpl.displayName = 'CityStateAutocomplete';

export const CityStateAutocomplete = forwardRef(CityStateAutocompleteImpl);
