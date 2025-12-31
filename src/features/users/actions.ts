'use server';
// Marks this file as a Server Action.
// This code runs only on the server, not in the client.

import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
// Imports the cacheTag function from Next.js.
// Used to associate this function's result with a cache tag for automatic caching and invalidation.

import { getUserIdTag } from './dbCache';
// Imports a helper function that generates a unique cache tag for a specific user ID.

import { db } from '@/drizzle/db';
// Imports the database instance (Drizzle ORM) for performing queries.

import { UserTable } from '@/drizzle/schema';
// Imports the database table schema for users.
// Provides type-safe access to columns in Drizzle ORM.

import { eq } from 'drizzle-orm';
// Imports the 'eq' helper for building a WHERE clause in Drizzle ORM queries.

export async function getUser(id: string) {
  // Defines an async function to fetch a user by ID from the database.
  // Returns the first matching user, or null if not found.

  'use cache';
  // Instructs Next.js to cache the result of this function automatically.
  // If the function is called again with the same input, the cached result is used
  // until the cache is invalidated.

  cacheTag(getUserIdTag(id));
  // Associates this function's cached result with a unique tag for this specific user ID.
  // If the user's data changes, the cache can be invalidated automatically.

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
  // Executes a query on the UserTable:
  // - Finds the first record where the user's ID equals the provided 'id'
  // - Returns the user object or null if no match is found
}
