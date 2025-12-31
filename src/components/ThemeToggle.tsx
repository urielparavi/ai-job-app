'use client';

// Mark this file as a Client Component so hooks like useState/useEffect can be used
import * as React from 'react';
import { useTheme } from 'next-themes'; // Hook to read and set the current theme
import { Monitor, Moon, Sun } from 'lucide-react'; // Icons for each theme option

// ShadCN UI components for the dropdown menu
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// React hooks for state and lifecycle
import { useLayoutEffect, useState } from 'react';

// Utility function for conditional class merging
import { cn } from '@/lib/utils';

// List of theme options used for rendering menu items dynamically
const themes = [
  {
    name: 'Light',
    Icon: Sun,
    value: 'light',
  },
  {
    name: 'Dark',
    Icon: Moon,
    value: 'dark',
  },
  {
    name: 'System',
    Icon: Monitor,
    value: 'system',
  },
] as const;

export function ThemeToggle() {
  // Tracks whether the component has mounted on the client
  // Needed to avoid hydration mismatches with next-themes
  const [mounted, setMounted] = useState(false);

  // Destructure theme controls from next-themes
  const { setTheme, theme, resolvedTheme } = useTheme();

  // Run once on initial mount — sets mounted = true
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  // Prevent rendering until mounted, avoiding SSR hydration issues
  if (!mounted) return null;

  return (
    <DropdownMenu>
      {/* The button that toggles the dropdown menu */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {/* Render the correct icon depending on the resolved theme (light/dark) */}
          {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
          {/* Screen-reader only label for accessibility */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown menu content aligned to the right */}
      <DropdownMenuContent align="end">
        {/* Render each theme option dynamically */}
        {themes.map(({ name, Icon, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)} // Switch theme on click
            className={cn(
              'cursor-pointer',
              // Highlight the currently active theme option
              theme === value && 'bg-accent text-accent-foreground'
            )}
          >
            {/* Theme icon */}
            <Icon className="size-4" />
            {/* Theme name text (Light / Dark / System) */}
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
