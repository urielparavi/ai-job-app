'use client'; // This file is a Client Component, so we can use React hooks like useEffect and useState

import { getUser } from '@/features/users/actions';
import { Loader2Icon } from 'lucide-react'; // Import a loading spinner icon
import { useRouter } from 'next/navigation'; // Import router hook to navigate programmatically on the client
import { useEffect } from 'react'; // Import useEffect hook to run side effects

export function OnboardingClient({ userId }: { userId: string }) {
  const router = useRouter(); // Initialize router to redirect user when account is ready

  useEffect(() => {
    // Start polling the database to check if the user has been created
    const intervalId = setInterval(async () => {
      const user = await getUser(userId); // Check if user exists in the database
      if (user == null) return; // If user doesn't exist yet, exit and wait for the next interval

      router.replace('/app'); // If user exists, redirect them to the main app
      clearInterval(intervalId); // Stop polling once the user is found
    }, 250); // Poll every 250 milliseconds (~4 times per second)

    // Cleanup function: ensures interval is cleared if component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [userId, router]); // Re-run effect if userId or router changes

  // Render a spinning loader while waiting for the user to be created
  return <Loader2Icon className="animate-spin size-24" />;
}
