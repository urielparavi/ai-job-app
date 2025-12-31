// Re-export everything from the 'user' schema so that other parts of the app
// can access the user table and its related definitions easily.
export * from './schema/user';
// - Exports all exports from user.ts
// - Makes UserTable, relations, types, etc., available for import elsewhere

export * from './schema/jobInfo';
// - Exports everything from jobInfo.ts
// - Makes JobInfoTable, relations, types, etc., accessible globally

export * from './schema/interview';
// - Exports everything from interview.ts
// - Makes InterviewTable, relations, types, etc., available for use in other modules

export * from './schema/question';
// - Exports everything from question.ts
// - Makes QuestionTable, relations, types, etc., accessible in the app
