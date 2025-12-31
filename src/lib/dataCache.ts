type CacheTag = 'users' | 'jobInfos' | 'interviews' | 'questions';

// Generate a global cache tag for an entire resource collection.
// Example: "global:users"
export function getGlobalTag(tag: CacheTag) {
  return `global:${tag}` as const;
}

// Generate a user-scoped cache tag for a specific resource related to a user.
// Example: "user:123:users"
export function getUserTag(tag: CacheTag, userId: string) {
  return `user:${userId}:${tag}` as const;
}

// Generate a jobInfo-scoped cache tag for a specific jobInfo record.
// Example: "jobInfo:87:jobInfos"
export function getJobInfoTag(tag: CacheTag, jobInfoId: string) {
  return `jobInfo:${jobInfoId}:${tag}` as const;
}

// Generate a generic ID-based cache tag for any entity with an ID.
// Example: "id:42:interviews"
export function getIdTag(tag: CacheTag, id: string) {
  return `id:${id}:${tag}` as const;
}
