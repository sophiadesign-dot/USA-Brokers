import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';

export const AppToaster: FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
      }}
    />
  );
};
