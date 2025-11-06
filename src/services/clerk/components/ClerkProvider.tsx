import { ReactNode } from 'react';
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';

export function CleckProvider({ children }: { children: React.ReactNode }) {
  return <OriginalClerkProvider>{children}</OriginalClerkProvider>;
}
