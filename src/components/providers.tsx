import { ClerkProvider } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { QueryProvider } from './qury-provider';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <QueryProvider>
      <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        publishableKey={PUBLISHABLE_KEY}
      >
        {children}
      </ClerkProvider>
    </QueryProvider>
  );
}
