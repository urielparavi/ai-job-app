import { env } from '@/data/env/server';
// Import environment variables, usually contains DATABASE_URL or other secrets

import { defineConfig } from 'drizzle-kit';
// Import the defineConfig helper from Drizzle Kit to create a configuration object

export default defineConfig({
  // Export the configuration as default using defineConfig

  out: './src/drizzle/migrations',
  // Path where Drizzle will generate migration files
  // These files contain the SQL or code to update your database schema

  schema: './src/drizzle/schema.ts',
  // Path to your schema file where all tables, columns, and relationships are defined

  dialect: 'postgresql',
  // Database dialect to use; Drizzle needs this to generate proper SQL
  // In this case, PostgreSQL

  dbCredentials: {
    url: env.DATABASE_URL,
    // Database connection string, taken from environment variables
    // Includes username, password, host, port, and database name
  },
});
