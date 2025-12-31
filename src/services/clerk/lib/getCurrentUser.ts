import { db } from '@/drizzle/db'; // Import Drizzle ORM database instance to run queries
import { UserTable } from '@/drizzle/schema'; // Import UserTable schema to know table structure
import { getUserIdTag } from '@/features/users/dbCache'; // Import function to generate a unique cache tag for each user
import { auth } from '@clerk/nextjs/server'; // Import Clerk auth function to get current user info on the server
import { eq } from 'drizzle-orm'; // Import equality function for building WHERE clauses in Drizzle queries
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'; // Import Next.js cacheTag function for cache invalidation

// Function to get the current user, optionally fetching full user data from our DB
export async function getCurrentUser({ allData = false } = {}) {
  // Call Clerk auth function to get current userId and redirect function
  const { userId, redirectToSignIn } = await auth();

  // Return userId, redirectToSignIn function, and optionally the full user object from our DB
  return {
    userId,
    redirectToSignIn,
    user: allData && userId != null ? await getUser(userId) : undefined, // Only fetch full user if requested and userId exists
  };
}

// Private function to fetch a user from our database by ID
async function getUser(id: string) {
  'use cache'; // Enable Next.js caching for this function
  cacheTag(getUserIdTag(id)); // Attach a cache tag for this specific user ID (for cache invalidation on updates)

  // Query the database for the first user with the matching ID
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
