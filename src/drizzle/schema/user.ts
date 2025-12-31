import { pgTable, varchar } from 'drizzle-orm/pg-core';
// Import `pgTable` to define a PostgreSQL table
// Import `varchar` to define text columns with variable length

import { createdAt, updatedAt } from '../schemaHelpers';
import { JobInfoTable } from './jobInfo';
import { relations } from 'drizzle-orm';
// Import helper columns for timestamps
// `createdAt` → automatically stores the creation time
// `updatedAt` → automatically updates on row changes

export const UserTable = pgTable('users', {
  // Define a PostgreSQL table named 'users'

  id: varchar().primaryKey(),
  // `id` column, type VARCHAR, set as primary key
  // This uniquely identifies each user
  // Here we use varchar because the ID comes from Clerk (external auth)

  name: varchar().notNull(),
  // `name` column, type VARCHAR, cannot be null
  // Stores the user's name

  email: varchar().notNull().unique(),
  // `email` column, type VARCHAR, cannot be null, must be unique
  // Ensures no two users have the same email

  imageUrl: varchar().notNull(),
  // `imageUrl` column, type VARCHAR, cannot be null
  // Stores the URL to the user's profile image

  createdAt,
  // Timestamp for when the row was created (imported from schemaHelpers)

  updatedAt,
  // Timestamp for when the row was last updated (imported from schemaHelpers)
});

export const userRelations = relations(UserTable, ({ many }) => ({
  // Define a one-to-many relationship for the UserTable
  // Each user can have multiple jobInfos associated

  jobInfos: many(JobInfoTable),
  // `jobInfos` represents all JobInfo rows that belong to this user
  // `many(JobInfoTable)` tells Drizzle ORM that this is a one-to-many relation
}));
