import { createEnv } from '@t3-oss/env-nextjs'; // Import createEnv from t3-oss/env-nextjs to define typed environment variables
import z from 'zod'; // Import Zod for runtime validation of environment variables

// Create a strongly-typed environment configuration using Zod validation
export const env = createEnv({
  // Define server-side environment variables
  server: {
    DB_PASSWORD: z.string().min(1), // Database password: must be a non-empty string
    DB_HOST: z.string().min(1), // Database host: must be a non-empty string
    DB_PORT: z.string().min(1), // Database port: must be a non-empty string (could convert to number later if needed)
    DB_USER: z.string().min(1), // Database username: must be a non-empty string
    DB_NAME: z.string().min(1), // Database name: must be a non-empty string

    ARCJET_KEY: z.string().min(1), // Arcjet API key: must be a non-empty string
    CLERK_SECRET_KEY: z.string().min(1), // Clerk secret key: must be a non-empty string
  },

  // Function to create a final schema that transforms the environment variables
  createFinalSchema: (env) => {
    return z.object(env).transform((val) => {
      // Destructure database-related variables from the validated env
      const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, ...rest } = val;

      // Return a new object containing:
      // 1. All other non-database env variables (rest)
      // 2. DATABASE_URL automatically built from the database components
      return {
        ...rest,
        DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      };
    });
  },

  // Convert empty strings from environment variables into undefined
  // This helps catch cases where variables exist but have no value
  emptyStringAsUndefined: true,

  // Provide the runtime environment variables (process.env) to be validated
  experimental__runtimeEnv: process.env,
});
