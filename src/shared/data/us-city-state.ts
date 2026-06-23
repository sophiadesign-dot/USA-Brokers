import { getAllCitiesOfCountry } from '@countrystatecity/countries-browser';

export const DEFAULT_US_CITY_STATE_SUGGESTION_LIMIT = 8;
export const DEFAULT_US_CITY_STATE_MIN_QUERY_LENGTH = 2;

export type FilterUsCityStateOptionsConfig = {
  limit?: number;
  minQueryLength?: number;
};

let optionsCache: string[] | null = null;
let optionsPromise: Promise<string[]> | null = null;

export async function loadUsCityStateOptions(): Promise<string[]> {
  if (optionsCache) {
    return optionsCache;
  }

  if (!optionsPromise) {
    optionsPromise = getAllCitiesOfCountry('US')
      .then((cities) => cities.map((city) => `${city.name}, ${city.state_code}`).sort((a, b) => a.localeCompare(b)))
      .catch((error: unknown) => {
        optionsPromise = null;
        throw error;
      });
  }

  optionsCache = await optionsPromise;
  return optionsCache;
}

export function resetUsCityStateOptionsCache() {
  optionsCache = null;
  optionsPromise = null;
}

export function filterUsCityStateOptions(
  options: readonly string[],
  query: string,
  {
    limit = DEFAULT_US_CITY_STATE_SUGGESTION_LIMIT,
    minQueryLength = DEFAULT_US_CITY_STATE_MIN_QUERY_LENGTH,
  }: FilterUsCityStateOptionsConfig = {}
) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < minQueryLength) {
    return [];
  }

  const prefixMatches: string[] = [];
  const includeMatches: string[] = [];

  for (const option of options) {
    const cityPart = option.split(',')[0]?.trim().toLowerCase() ?? option.toLowerCase();

    if (cityPart.startsWith(normalizedQuery)) {
      prefixMatches.push(option);

      if (prefixMatches.length >= limit) {
        return prefixMatches;
      }
    }
  }

  for (const option of options) {
    if (prefixMatches.includes(option)) {
      continue;
    }

    if (option.toLowerCase().includes(normalizedQuery)) {
      includeMatches.push(option);

      if (prefixMatches.length + includeMatches.length >= limit) {
        break;
      }
    }
  }

  return [...prefixMatches, ...includeMatches].slice(0, limit);
}
