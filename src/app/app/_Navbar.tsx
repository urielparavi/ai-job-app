'use client';
// Marks this component as a Client Component (required because we use hooks, Clerk, and client-side UI)

import {
  BookOpenIcon,
  BrainCircuitIcon,
  FileSlidersIcon,
  LogOut,
  SpeechIcon,
  User,
} from 'lucide-react';
// Icons used in the navbar (Lucide icon library)

import { ThemeToggle } from '@/components/ThemeToggle';
// Component for toggling between light/dark theme

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// UI dropdown menu components (Radix / shadcn)

import { SignOutButton, useClerk } from '@clerk/nextjs';
// Clerk authentication helpers: sign out + open profile modal

import Link from 'next/link';
// Next.js client-side navigation

import { UserAvatar } from '@/components/UserAvatar';
// Custom component that renders the user's avatar

import { useParams, usePathname } from 'next/navigation';
// Hooks to read route params and current pathname

import { Button } from '@/components/ui/button';
// Reusable Button component

// Navigation links that depend on jobInfoId
const navLinks = [
  { name: 'Interviews', href: 'interviews', Icon: SpeechIcon },
  { name: 'Questions', href: 'questions', Icon: BookOpenIcon },
  { name: 'Resume', href: 'resume', Icon: FileSlidersIcon },
];

// Navbar component receives the logged-in user data as props
export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  // Clerk helper for opening the user profile modal
  const { openUserProfile } = useClerk();

  // Read dynamic route params (e.g. jobInfoId from /job-infos/[jobInfoId])
  const { jobInfoId } = useParams();

  // Current URL pathname (used to highlight active nav link)
  const pathName = usePathname();

  return (
    <nav className="h-header border-b">
      {/* Main navbar container */}
      <div className="container flex h-full items-center justify-between">
        {/* Logo + App name */}
        <Link href="/app" className="flex items-center gap-2">
          <BrainCircuitIcon className="size-8 text-primary" />
          <span className="text-xl font-bold">Landr</span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Render job-related navigation links only if jobInfoId exists */}
          {typeof jobInfoId === 'string' &&
            navLinks.map(({ name, href, Icon }) => {
              // Build the full path dynamically
              const hrefPath = `/app/job-infos/${jobInfoId}/${href}`;

              return (
                <Button
                  // Highlight the active link based on current pathname
                  variant={pathName === hrefPath ? 'secondary' : 'ghost'}
                  key={name}
                  asChild
                  className="cursor-pointer max-sm:hidden"
                >
                  {/* Link wrapped inside Button for styling */}
                  <Link href={hrefPath}>
                    <Icon />
                    {name}
                  </Link>
                </Button>
              );
            })}

          {/* Theme toggle (light / dark mode) */}
          <ThemeToggle />

          {/* User dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* User avatar as the dropdown trigger */}
              <UserAvatar user={user} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* Open Clerk profile modal */}
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-2" />
                Profile
              </DropdownMenuItem>

              {/* Sign out button using Clerk */}
              <SignOutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
