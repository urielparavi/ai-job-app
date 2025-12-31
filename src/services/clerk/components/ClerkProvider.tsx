// Import ReactNode type from React
// ReactNode represents any valid React content that can be rendered inside a component
import { ReactNode } from 'react';

// Import the original ClerkProvider from Clerk for Next.js
// Rename it to OriginalClerkProvider to avoid naming conflicts
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';

// Define a custom provider component named CleckProvider
// It accepts a 'children' prop which can be any ReactNode (JSX, text, other components)
export function CleckProvider({ children }: { children: React.ReactNode }) {
  // Wrap the children with the original ClerkProvider
  // This gives all wrapped components access to Clerk's authentication context
  // At this point, this component does not modify behavior; it's just a simple wrapper
  return <OriginalClerkProvider>{children}</OriginalClerkProvider>;
}
