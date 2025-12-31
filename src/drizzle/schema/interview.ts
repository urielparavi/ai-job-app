import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
// Import helpers from Drizzle ORM for defining PostgreSQL tables and column types:
// - pgTable: function to define a table
// - uuid: UUID column type
// - varchar: variable-length string column type

import { createdAt, id, updatedAt } from '../schemaHelpers';
// Import reusable schema helpers:
// - id: typically a primary key (UUID)
// - createdAt: timestamp for row creation
// - updatedAt: timestamp for last row update

import { JobInfoTable } from './jobInfo';
// Import the JobInfo table to create a foreign key relationship

import { relations } from 'drizzle-orm/relations';
// Import the relations helper to define relationships between tables

export const InterviewTable = pgTable('interviews', {
  id, // Primary key for the interviews table (UUID)

  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: 'cascade' })
    .notNull(),
  // Foreign key referencing JobInfoTable.id
  // - onDelete: 'cascade' means deleting a JobInfo will delete all related interviews
  // - notNull ensures every interview must be linked to a job

  duration: varchar().notNull(),
  // Duration of the interview (string), cannot be null

  humeChatId: varchar(),
  // Optional: external chat ID or system reference, can be null

  feedback: varchar(),
  // Optional: feedback about the interview, can be null

  createdAt,
  // Timestamp for when the row was created

  updatedAt,
  // Timestamp for when the row was last updated
});

export const interviewRelations = relations(InterviewTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [InterviewTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
  // Define a one-to-one relationship:
  // - Each interview is linked to exactly one JobInfo
  // - 'fields' is the foreign key column in InterviewTable
  // - 'references' is the primary key in JobInfoTable
}));
