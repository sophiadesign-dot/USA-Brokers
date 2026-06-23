import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@modules/home';
import { Privacy } from '@modules/privacy';
import { Terms } from '@modules/terms';
import { AppToaster } from '@/shared/components/app-toaster';

export const App: FC = () => {
  return (
    <>
      <AppToaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  );
};
