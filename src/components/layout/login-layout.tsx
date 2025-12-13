'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import LoginPage from '@/app/login/page';

export function LoginLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <LoginPage />;
  }

  return <>{children}</>;
}
