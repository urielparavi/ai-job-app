// Import PostgreSQL-specific helpers from Drizzle ORM
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
// - pgTable: define a table
// - varchar: variable-length string column
// - pgEnum: define a PostgreSQL ENUM type

// Import common schema helpers for ID and timestamps
import { createdAt, id, updatedAt } from '../schemaHelpers';
// - id: primary key UUID
// - createdAt: timestamp when a row is created
// - updatedAt: timestamp when a row is last updated

// Import relations helper to define table relationships
import { relations } from 'drizzle-orm';

// Import tables to reference in JobInfoTable
import { UserTable } from './user';
import { QuestionTable } from './question';
import { InterviewTable } from './interview';

// Define the possible experience levels as a constant array
export const experienceLevels = ['junior', 'mid-level', 'senior'] as const;
// - Using 'as const' makes this a readonly tuple for type safety

// Create a TypeScript type representing one of the experience levels
export type experienceLevel = (typeof experienceLevels)[number];
// - 'experienceLevel' can be 'junior' | 'mid-level' | 'senior'

// Define a PostgreSQL ENUM based on the experienceLevels array
export const experienceLevelEnum = pgEnum(
  'job_infos_experience_level', // ENUM name in the database
  experienceLevels // Allowed values for the ENUM
);

// Define the JobInfoTable schema
export const JobInfoTable = pgTable('job_info', {
  id, // Primary key UUID from schemaHelpers

  title: varchar(),
  // Optional job title

  name: varchar().notNull(),
  // Required name for UI display

  experienceLevel: experienceLevelEnum().notNull(),
  // Required experience level, constrained by ENUM

  description: varchar().notNull(),
  // Required job description

  userId: varchar()
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  // Foreign key referencing the creator (UserTable.id)
  // - onDelete: 'cascade' means if the user is deleted, their jobs are also deleted
  // - Required field

  createdAt,
  // Timestamp for job creation

  updatedAt,
  // Timestamp for last update
});

// Define relationships for JobInfoTable
export const jobInfoRelations = relations(JobInfoTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [JobInfoTable.userId], // Local foreign key in JobInfoTable
    references: [UserTable.id], // Primary key in UserTable
    // One-to-One relationship: each job belongs to exactly one user
  }),

  questions: many(QuestionTable),
  // One-to-Many relationship: a job can have multiple questions

  interviews: many(InterviewTable),
  // One-to-Many relationship: a job can have multiple interviews
}));
