import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs/server";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    // For local development, you might want to skip verification
    const isDevelopment = process.env.NODE_ENV === "development";

    let evt: WebhookEvent;

    if (!isDevelopment) {
      // Production: Verify webhook signature
      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json(
          { error: "Missing svix headers" },
          { status: 400 }
        );
      }

      const payload = await req.text();
      const wh = new Webhook(webhookSecret);

      try {
        evt = wh.verify(payload, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        }) as WebhookEvent;
      } catch (err) {
        console.error("Webhook verification failed:", err);
        return NextResponse.json(
          { error: "Webhook verification failed" },
          { status: 400 }
        );
      }
    } else {
      // Development: Skip verification (NOT recommended for production)
      console.warn("⚠️  Webhook signature verification skipped in development");
      const payload = await req.json();
      evt = payload as WebhookEvent;
    }

    switch (evt.type) {
      case "user.created":
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          phone_numbers,
          image_url,
        } = evt.data;

        // Set default role as tenant in Clerk's publicMetadata
        (await clerkClient()).users.updateUserMetadata(id, {
          publicMetadata: {
            role: "tenant",
          },
        });

        // Call Express backend to store user
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
            },
            body: JSON.stringify({
              clerkId: id,
              email: email_addresses[0]?.email_address,
              name: `${first_name} ${last_name}`,
              phoneNumber: phone_numbers[0].phone_number,
              image_url: image_url,
              role: "tenant",
            }),
          }
        );
        if (!response.ok) {
          console.error(
            "Failed to create user in database:",
            await response.text()
          );
        }
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
