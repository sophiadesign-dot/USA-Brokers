import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_US_CITY_STATE_SUGGESTION_LIMIT,
  DEFAULT_US_CITY_STATE_MIN_QUERY_LENGTH,
  filterUsCityStateOptions,
  loadUsCityStateOptions,
  resetUsCityStateOptionsCache,
} from '@/shared/data/us-city-state';

export type UseUsCityStateOptionsConfig = {
  enabled?: boolean;
  limit?: number;
  minQueryLength?: number;
};

export type UseUsCityStateOptionsResult = {
  options: readonly string[];
  isLoading: boolean;
  isReady: boolean;
  error: Error | null;
  getSuggestions: (query: string) => string[];
  reload: () => void;
};

export function useUsCityStateOptions({
  enabled = true,
  limit = DEFAULT_US_CITY_STATE_SUGGESTION_LIMIT,
  minQueryLength = DEFAULT_US_CITY_STATE_MIN_QUERY_LENGTH,
}: UseUsCityStateOptionsConfig = {}): UseUsCityStateOptionsResult {
  const [options, setOptions] = useState<readonly string[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchOptions = useCallback(() => {
    if (!enabled) {
      return () => undefined;
    }

    let cancelled = false;

    void loadUsCityStateOptions()
      .then((loadedOptions) => {
        if (!cancelled) {
          setOptions(loadedOptions);
        }
      })
      .catch((cause: unknown) => {
        if (!cancelled) {
          setError(cause instanceof Error ? cause : new Error('Failed to load city options'));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    return fetchOptions();
  }, [fetchOptions]);

  const getSuggestions = useCallback(
    (query: string) => filterUsCityStateOptions(options, query, { limit, minQueryLength }),
    [limit, minQueryLength, options]
  );

  const reload = useCallback(() => {
    resetUsCityStateOptionsCache();
    setOptions([]);
    setError(null);
    setIsLoading(true);
    fetchOptions();
  }, [fetchOptions]);

  return {
    options,
    isLoading,
    isReady: options.length > 0,
    error,
    getSuggestions,
    reload,
  };
}
