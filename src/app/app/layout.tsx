import { getCurrentUser } from '@/services/clerk/lib/getCurrentUser';
// Function to fetch the current user data:
// - userId from Clerk
// - user from our local database

import { redirect } from 'next/navigation';
// Next.js function for performing server-side redirects

import { ReactNode } from 'react';
import { Navbar } from './_Navbar';
// React type representing children that can be rendered inside a component

export default async function AppLayout({ children }: { children: ReactNode }) {
  // Async Layout component that wraps all pages in the app
  // Receives `children` – all content inside this layout

  const { userId, user } = await getCurrentUser({ allData: true });
  // Fetch current user:
  // - userId = the Clerk user ID
  // - user = the user in our local database
  // allData: true → fetch all user data from both Clerk and our DB

  if (userId == null) return redirect('/');
  // If there is no Clerk userId (user is not logged in)
  // Redirect to the homepage

  if (user == null) return redirect('/onboarding');
  // If the user does not exist in our database yet
  // Redirect to the onboarding page to create the user
  // This means the user is logged in with Clerk but not in our DB yet

  return (
    <>
      <Navbar user={user} />
      {/* Render the Navbar with user information */}
      {children}
      {/* Render all the page content inside the layout */}
    </>
  );
}
