import { getCurrentUser } from '@/services/clerk/lib/getCurrentUser'; // Import function to get current user info (from Clerk + our DB)
import { redirect } from 'next/navigation'; // Import redirect function from Next.js for server-side redirects
import { OnboardingClient } from './_client'; // Import the client-side onboarding component

export default async function OnboardingPage() {
  // Fetch current user data (both Clerk ID and our DB user)
  const { userId, user } = await getCurrentUser({ allData: true });

  // If user is not logged in (no Clerk userId), redirect to homepage
  if (userId == null) return redirect('/');

  // If user already exists in our database, redirect directly to the app
  if (user != null) return redirect('/app');

  // Otherwise, render onboarding page with loading spinner
  return (
    <div className="containter flex flex-col items-center justify-center h-screen gap-4">
      {/* Page heading */}
      <h1 className="text-4xl">Creating your account...</h1>

      {/* Client-side component that polls DB until user is created */}
      <OnboardingClient userId={userId} />
    </div>
  );
}
