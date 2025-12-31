// import arcjet, { detectBot, shield, slidingWindow } from '@arcjet/next';
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { env } from './data/env/server';

// // Define which routes are considered public (no authentication required).
// // Webhooks must stay public so external services like Clerk can reach them.
// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)', // Sign-in pages
//   '/', // Home page
//   '/api/webhooks(.*)', // Webhook endpoints
// ]);

// // Initialize Arcjet security middleware with API key and security rules.
// const aj = arcjet({
//   key: env.ARCJET_KEY,
//   rules: [
//     // Basic protection layer against common attacks.
//     shield({ mode: 'LIVE' }),

//     // Bot detection with exceptions for important categories like search engines.
//     detectBot({
//       mode: 'LIVE',
//       allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR', 'CATEGORY:PREVIEW'],
//     }),

//     // Rate limiting using a sliding window: max 100 requests per minute.
//     slidingWindow({
//       mode: 'LIVE',
//       interval: '1m',
//       max: 100,
//     }),
//   ],
// });

// // Combine Clerk authentication with Arcjet security logic.
// export default clerkMiddleware(async (auth, req) => {
//   // Ask Arcjet whether the request should be allowed.
//   const decision = await aj.protect(req);

//   // Arcjet denies the request → block with 403.
//   if (decision.isDenied()) {
//     return new Response(null, { status: 403 });
//   }

//   // If the route is not public, require a valid authenticated session.
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// });

// // Configure which routes Next.js applies the middleware to.
// export const config = {
//   matcher: [
//     // Run middleware for all pages except Next.js internals & static assets.
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

//     // Always run middleware for API routes.
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
