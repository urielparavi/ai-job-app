import { deleteUser, upsertUser } from '@/features/users/db';
// Importing functions to insert/update or delete users in the database

import { verifyWebhook } from '@clerk/nextjs/webhooks';
// Importing Clerk's webhook verification function to validate incoming requests

import { NextRequest } from 'next/server';
// Importing Next.js type for server-side request

export async function POST(request: NextRequest) {
  // Define a POST handler for the webhook endpoint
  try {
    const event = await verifyWebhook(request);
    // Verify the webhook signature and parse the event object

    switch (event.type) {
      // Switch on the type of event received from Clerk
      case 'user.created':
      case 'user.updated':
        const clerkData = event.data;
        // Extract user data from the webhook event

        const email = clerkData.email_addresses.find(
          (e) => e.id === clerkData.primary_email_address_id
        )?.email_address;
        // Find the primary email address from the array of emails

        if (email == null) {
          // If no primary email is found, return 400 Bad Request
          return new Response('No primary email found', { status: 400 });
        }

        await upsertUser({
          // Insert or update the user in the database
          id: clerkData.id,
          email,
          name: `${clerkData.first_name} ${clerkData.last_name}`,
          imageUrl: clerkData.image_url,
          createdAt: new Date(clerkData.created_at),
          updatedAt: new Date(clerkData.updated_at),
        });

        break;
      case 'user.deleted':
        if (event.data.id == null) {
          // If deleted user has no ID, return 400 Bad Request
          return new Response('No user ID found', { status: 400 });
        }

        await deleteUser(event.data.id);
        // Delete the user from the database
        break;
    }
  } catch {
    // Catch any error from webhook verification or database operations
    return new Response('Invalid webhook', { status: 400 });
    // Return 400 if the request is invalid
  }

  return new Response('Webhook received', { status: 200 });
  // Respond with 200 OK if everything succeeds
}
