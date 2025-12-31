import { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// UserAvatar is a reusable avatar component that displays
// either the user's profile image or a fallback with initials
export function UserAvatar({
  user,
  ...props
}: {
  // User object containing basic display information
  user: { name: string; imageUrl: string };
} & ComponentProps<typeof Avatar>) {
  // The component also accepts all props that the Avatar component supports
  // (className, onClick, size, etc.)
  return (
    <Avatar {...props}>
      {/* Displays the user's profile image if available */}
      <AvatarImage src={user.imageUrl} alt={user.name} />

      {/* Fallback shown when the image is missing or fails to load */}
      <AvatarFallback className="uppercase">
        {
          // Generate initials from the user's name:
          // 1. Split the full name into words
          // 2. Take up to the first two words
          // 3. Extract the first letter of each word
          // 4. Join them together and convert to uppercase
          user.name
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        }
      </AvatarFallback>
    </Avatar>
  );
}
