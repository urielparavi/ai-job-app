import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
// Import tools to define PostgreSQL tables, columns, and enums.

import { createdAt, id, updatedAt } from '../schemaHelpers';
// Import shared helper columns:
// `id`        → UUID primary key with default value
// `createdAt` → timestamp when the row was created
// `updatedAt` → timestamp when the row was last updated

import { relations } from 'drizzle-orm';
// Import the function used to define table relations.

import { JobInfoTable } from './jobInfo';
// Import JobInfoTable so we can reference it from this table.

// -------------------------------------------
// ENUM: Question Difficulty
// -------------------------------------------

export const questionDifficulties = ['easy', 'medium', 'hard'] as const;
// Array of allowed difficulty values. `as const` makes the values readonly.

export type QuestionDifficulty = (typeof questionDifficulties)[number];
// TypeScript type generated from the array above.
// Result: "easy" | "medium" | "hard"

export const questionDifficultyEnum = pgEnum(
  'questions_question_difficulty',
  questionDifficulties
);
// Create a real PostgreSQL ENUM named 'questions_question_difficulty'.
// It uses the values from `questionDifficulties`.

// -------------------------------------------
// TABLE: Questions
// -------------------------------------------

export const QuestionTable = pgTable('questions', {
  // Define a PostgreSQL table named "questions".

  id,
  // Primary key (UUID). Comes from schemaHelpers.

  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: 'cascade' })
    .notNull(),
  // Foreign key referencing JobInfoTable.id.
  // `onDelete: 'cascade'` → if a JobInfo is deleted,
  //    all related questions are deleted automatically.
  // Must not be null.

  text: varchar().notNull(),
  // The question text itself. Required field.

  difficulty: questionDifficultyEnum().notNull(),
  // Difficulty column using the ENUM created above.
  // Must be "easy" | "medium" | "hard".

  createdAt,
  // Timestamp when the row was created.

  updatedAt,
  // Timestamp when the row was last updated.
});

// -------------------------------------------
// RELATIONS
// -------------------------------------------

export const questionsRelations = relations(QuestionTable, ({ one }) => ({
  // Define relational rules for QuestionTable.

  jobInfo: one(JobInfoTable, {
    // Each question belongs to one JobInfo.

    fields: [QuestionTable.jobInfoId],
    // Local field used as the foreign key.

    references: [JobInfoTable.id],
    // The referenced primary key in JobInfoTable.
  }),
}));
