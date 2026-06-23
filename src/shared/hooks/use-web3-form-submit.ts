import { useCallback } from 'react';
import { showErrorToast, showSuccessToast } from '@/shared/utils/app-toast';
import { submitWeb3Form, Web3FormsError, type Web3FormFields } from '@/shared/utils/submit-web3form';

export const DEFAULT_FORM_SUCCESS_MESSAGE = 'Thank you! We received your request and will contact you shortly.';

export const WEB3FORM_FROM_NAME = 'USA Brokers Website';

export type UseWeb3FormSubmitConfig = {
  successMessage?: string;
  successToastColor?: string;
  errorToastColor?: string;
  onSuccess?: () => void;
};

export function buildFormSubject(formName: string, firstName: string, lastName: string) {
  const username = `${firstName} ${lastName}`.trim();

  return `${formName} from ${username}`;
}

export function buildContactFields(
  values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  },
  formSource: string
): Web3FormFields {
  return {
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    phone: values.phone,
    form_source: formSource,
  };
}

export function useWeb3FormSubmit({
  successMessage = DEFAULT_FORM_SUCCESS_MESSAGE,
  successToastColor,
  errorToastColor,
  onSuccess,
}: UseWeb3FormSubmitConfig = {}) {
  const submitForm = useCallback(
    async (fields: Web3FormFields) => {
      try {
        await submitWeb3Form({
          from_name: WEB3FORM_FROM_NAME,
          ...fields,
        });

        showSuccessToast(successMessage, successToastColor);
        onSuccess?.();
      } catch (error) {
        const message = error instanceof Web3FormsError ? error.message : 'Something went wrong. Please try again.';

        showErrorToast(message, errorToastColor);
      }
    },
    [errorToastColor, onSuccess, successMessage, successToastColor]
  );

  return { submitForm };
}
