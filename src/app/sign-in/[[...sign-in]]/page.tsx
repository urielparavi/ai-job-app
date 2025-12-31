// Import the pre-built SignIn component from Clerk for Next.js
// This provides a ready-to-use login form with email/password and social logins (Google, GitHub, etc.)
import { SignIn } from '@clerk/nextjs';

// Default export of the SignInPage component
// This page will be rendered at the /sign-in route
export default function SignInPage() {
  return (
    // Wrap the sign-in form in a div for layout control
    <div className="flex h-screen w-screen items-center justify-center">
      {/* Render Clerk's pre-built SignIn form */}
      {/* Handles login, social auth, and redirect automatically */}
      <SignIn />
    </div>
  );
}
