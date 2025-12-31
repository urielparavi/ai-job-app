import { timestamp, uuid } from 'drizzle-orm/pg-core';
// Import `uuid` to define UUID columns (unique identifiers)
// Import `timestamp` to define timestamp/date columns

export const id = uuid().primaryKey().defaultRandom();
// `id` column: type UUID
// Set as primary key (uniquely identifies each row)
// `defaultRandom()` → generates a random UUID automatically if no value is provided

export const createdAt = timestamp({ withTimezone: true })
  .notNull() // Column cannot be null
  .defaultNow(); // Defaults to current timestamp when the row is created
// `createdAt` column: stores the creation time of the row
// `withTimezone: true` ensures timestamps include timezone info

export const updatedAt = timestamp({ withTimezone: true })
  .notNull() // Column cannot be null
  .defaultNow() // Defaults to current timestamp on row creation
  .$onUpdate(() => new Date());
// `updatedAt` column: stores the last update time of the row
// `$onUpdate(() => new Date())` → automatically updates to current timestamp on row modification
