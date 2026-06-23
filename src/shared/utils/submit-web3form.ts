const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

export class Web3FormsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Web3FormsError';
  }
}

export type Web3FormFields = Record<string, string | number | boolean | undefined>;

export async function submitWeb3Form(fields: Web3FormFields): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Web3FormsError('Form is not configured. Please try again later.');
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      botcheck: '',
      ...fields,
    }),
  });

  if (!response.ok) {
    throw new Web3FormsError('Something went wrong. Please try again.');
  }

  const data = (await response.json()) as Web3FormsResponse;

  if (!data.success) {
    throw new Web3FormsError(data.message ?? 'Something went wrong. Please try again.');
  }
}
