import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  // Get the Clerk webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return new Response("Missing webhook secret", { status: 500 });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, return 400
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // Handle user creation
  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;

    // Check if user already exists (shouldn't happen for user.created, but just in case)
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: id as string,
      },
    });

    if (!existingUser) {
      // Get the primary email
      const primaryEmail = email_addresses?.[0]?.email_address;
      const name = first_name && last_name ? `${first_name} ${last_name}` : username || primaryEmail?.split('@')[0];

      // Create the user in the database
      await prisma.user.create({
        data: {
          clerkId: id as string,
          email: primaryEmail,
          name: name as string,
          username: username as string || primaryEmail?.split('@')[0],
          image: image_url,
          // Set default values for any required fields
        },
      });
    }

    return NextResponse.json({ success: true });
  }

  // Handle user updated
  if (eventType === "user.updated") {
    const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;

    // Find the user to update
    const user = await prisma.user.findUnique({
      where: {
        clerkId: id as string,
      },
    });

    if (user) {
      // Get the primary email
      const primaryEmail = email_addresses?.[0]?.email_address;
      const name = first_name && last_name ? `${first_name} ${last_name}` : username || primaryEmail?.split('@')[0];

      // Update the user
      await prisma.user.update({
        where: {
          clerkId: id as string,
        },
        data: {
          email: primaryEmail,
          name: name as string,
          username: username as string || primaryEmail?.split('@')[0],
          image: image_url,
        },
      });
    }

    return NextResponse.json({ success: true });
  }

  // Handle user deletion
  if (eventType === "user.deleted") {
    // Delete the user from your database
    await prisma.user.delete({
      where: {
        clerkId: id as string,
      },
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}

export const runtime = 'nodejs'; 