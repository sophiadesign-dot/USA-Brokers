import type { FieldError } from 'react-hook-form';

/**
 * Flattens `FieldError.message` from react-hook-form + zod (string | string[] | nested) for UI text.
 */
export function formErrorMessage(message: unknown): string | undefined {
  if (message == null || message === false) {
    return undefined;
  }
  if (typeof message === 'string') {
    return message;
  }
  if (Array.isArray(message)) {
    const parts = message
      .map((item) => formErrorMessage(item))
      .filter((s): s is string => typeof s === 'string' && s.length > 0);
    return parts.length > 0 ? parts.join(' ') : undefined;
  }
  if (typeof message === 'object' && message !== null && 'message' in message) {
    return formErrorMessage((message as { message: unknown }).message);
  }
  return undefined;
}

export function fieldErrorMessage(error: FieldError | undefined): string | undefined {
  return formErrorMessage(error?.message);
}
