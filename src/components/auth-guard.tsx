'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isAuthenticated = !!sessionStorage.getItem('isAuthenticated');
    
    // If trying to access a protected route and not authenticated, redirect to login
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
    } 
    // If authenticated and trying to access login, redirect to home
    else if (isAuthenticated && pathname === '/login') {
      router.push('/');
    }
    // Otherwise, authentication is checked and we can show the page
    else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking) {
    return <Loading />;
  }

  return <>{children}</>;
}
