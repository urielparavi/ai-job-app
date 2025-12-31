// Import SignInButton and UserButton components from Clerk for Next.js
// SignInButton → redirects the user to /sign-in if they are not logged in
// UserButton → shows the user's profile info and allows actions like logout if logged in
import { ThemeToggle } from '@/components/ThemeToggle';
import { SignInButton, UserButton } from '@clerk/nextjs';

// Default export of the HomePage component
// This is the page that will render at the root (/) route
export default function HomePage() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        {/* Render Clerk's SignIn button */}
        {/* If the user is not signed in, clicking this button navigates to the /sign-in page */}
        <SignInButton />

        {/* Render Clerk's User button */}
        {/* If the user is signed in, this button displays their name or profile image */}
        {/* Clicking it allows user actions such as logout, account settings, etc. */}
        <UserButton />

        <ThemeToggle />
      </div>
    </div>
  );
}
