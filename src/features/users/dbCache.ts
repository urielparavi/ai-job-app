import { getGlobalTag, getIdTag } from '@/lib/dataCache';
import { revalidateTag } from 'next/cache';

// Returns the global cache tag for all users.
// Used when we want to invalidate cache related to any user data.
export function getUserGlobalTag() {
  return getGlobalTag('users');
}

// Returns a cache tag for a specific user by ID.
// Useful for invalidating data of a single user.
export function getUserIdTag(id: string) {
  return getIdTag('users', id);
}

// Revalidates cache for both the global users tag
// and the specific user ID tag.
// Ensures both "all users" data and "single user" data are refreshed.
export function revalidateUserCache(id: string) {
  revalidateTag(getUserGlobalTag(), 'default'); // Revalidate global users cache
  revalidateTag(getUserIdTag(id), 'default'); // Revalidate specific user cache
}
