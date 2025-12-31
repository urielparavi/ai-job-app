import { env } from '@/data/env/server';

// Import the 'drizzle' function from the Node.js Postgres adapter
import { drizzle } from 'drizzle-orm/node-postgres';

// Import all database schema definitions (tables, relations, etc.)
import * as schema from '@/drizzle/schema';

// Create a Drizzle database instance
// - env.DATABASE_URL contains the connection string to your Postgres database
// - { schema } tells Drizzle about your tables and their structure
export const db = drizzle(env.DATABASE_URL, { schema });
