// Import the Metadata type from Next.js
// Used to define page metadata like title and description
import type { Metadata } from 'next';

// Import Google Fonts using Next.js' next/font system
// Outfit is a sans-serif font, Geist_Mono is a monospace font
import { Outfit } from 'next/font/google';

// Import global CSS for the application
import './globals.css';

// Import ClerkProvider for authentication context
// Provides authentication features such as login, register, and user management
import { ClerkProvider } from '@clerk/nextjs';

// Import ThemeProvider to manage light/dark mode themes
import { ThemeProvider } from 'next-themes';

// Load the Outfit font and assign it to a CSS variable
const outfitSans = Outfit({
  variable: '--font-outfit-sans', // CSS variable that can be used in the <body> class
  subsets: ['latin'], // Load only Latin characters for better performance
});

// Define metadata for the app
export const metadata: Metadata = {
  title: 'AI Sass Project', // Browser tab title
  description:
    'An AI-powered SaaS application built with Next.js and Clerk for authentication.',
  // Page description used for SEO and social sharing
};

// RootLayout component wraps the entire app
// This is the top-level layout in Next.js App Router
export default function RootLayout({
  children, // Content of each page is injected here
}: Readonly<{
  children: React.ReactNode; // TypeScript type for children
}>) {
  return (
    // Wrap the entire app with ClerkProvider
    // Provides authentication context to all pages/components
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* lang="en" improves accessibility and SEO */}
        {/* suppressHydrationWarning prevents hydration warnings related to theme changes */}
        <body
          // Apply the Outfit font + antialiased for smoother text rendering
          className={`${outfitSans.variable} antialiased font-sans`}
        >
          {/* ThemeProvider provides theme context (light/dark) to all child components */}
          <ThemeProvider
            attribute="class" // Uses a class on <html> to toggle light/dark mode
            defaultTheme="system" // Uses the system theme as default
            enableColorScheme // Allows the browser to properly adjust colors, scrollbars, etc.
            disableTransitionOnChange // Switches theme instantly without animation
          >
            {/* Render the content of the current page here */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
