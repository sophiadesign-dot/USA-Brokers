import toast, { type ToastOptions } from 'react-hot-toast';

const TOAST_BASE_STYLE: ToastOptions['style'] = {
  color: '#ffffff',
  borderRadius: '8px',
  fontFamily: '"Open Sans", sans-serif',
  fontSize: '14px',
  lineHeight: '140%',
  padding: '12px 16px',
};

export const TOAST_COLORS = {
  success: '#0b1842',
  error: '#b91c1c',
} as const;

export function showSuccessToast(message: string, backgroundColor: string = TOAST_COLORS.success) {
  toast.success(message, {
    style: {
      ...TOAST_BASE_STYLE,
      background: backgroundColor,
    },
  });
}

export function showErrorToast(message: string, backgroundColor: string = TOAST_COLORS.error) {
  toast.error(message, {
    style: {
      ...TOAST_BASE_STYLE,
      background: backgroundColor,
    },
  });
}
