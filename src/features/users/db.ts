import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidateUserCache } from './dbCache';

// Inserts or updates a user record in the database.
// If the user already exists (matched by ID), it updates the existing row.
// Otherwise, it creates a new one.
export async function upsertUser(user: typeof UserTable.$inferInsert) {
  await db
    .insert(UserTable) // Insert into the UserTable
    .values(user) // Use the provided user object as the values
    .onConflictDoUpdate({
      target: [UserTable.id], // If a conflict occurs on the "id" column...
      set: user, // ...update the row with the new user fields
    });

  revalidateUserCache(user.id); // Refresh cached data for this user
}

// Deletes a user record from the database based on its ID.
export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id)); // Delete matching user row

  revalidateUserCache(id); // Revalidate cache after deletion
}
