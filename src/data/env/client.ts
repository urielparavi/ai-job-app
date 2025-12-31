import { createEnv } from '@t3-oss/env-nextjs';
// Import the createEnv helper from the T3 OSS library.
// This helps validate and safely expose environment variables in Next.js.

import z from 'zod';
// Import Zod, the validation library used to define expected types and constraints
// for each environment variable.

export const env = createEnv({
  // Create and export the `env` object. This object will hold all validated
  // environment variables and will be used throughout the app.

  client: {
    // Environment variables that are safe to expose to the browser.
    // Next.js only allows exposing variables that start with "NEXT_PUBLIC_".

    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    // Must be a non-empty string. Used for Clerk's sign-in URL.

    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string().min(1),
    // Must be a non-empty string. Redirect URL if the primary sign-in redirect fails.

    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string().min(1),
    // Must be a non-empty string. Redirect URL after forced signup flow.

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    // Must be a non-empty string. Public (non-secret) Clerk API key.
  },

  emptyStringAsUndefined: true,
  // Treat empty strings as "undefined". This prevents silently passing empty values
  // and forces proper validation (so missing env vars throw errors).

  experimental__runtimeEnv: {
    // These values will be exposed to the client at runtime.
    // Next.js requires you to manually map each public variable.
    // Each value comes directly from process.env.

    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    // Maps the actual env value to the key used on the client.

    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    // Maps fallback redirect env var.

    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    // Maps forced signup redirect env var.

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // Maps Clerk’s publishable (non-secret) key.
  },
});
// End of the createEnv configuration.
