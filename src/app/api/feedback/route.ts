import { NextRequest, NextResponse } from "next/server";
import type { FeedbackEntry } from "@/types";

// In-memory fallback when Firebase is not configured
const feedbackStore: FeedbackEntry[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<FeedbackEntry>;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "name, email, and message are required" },
        { status: 400 }
      );
    }

    const entry: FeedbackEntry = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
      status: "unread",
    };

    // Store in memory (production: write to Firestore via Admin SDK)
    feedbackStore.push(entry);
    console.log("[Feedback] Stored:", entry.name, entry.email);

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
  } catch (err) {
    console.error("[API /feedback POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // Returns in-memory entries (protected by admin middleware in production)
  return NextResponse.json({ entries: feedbackStore });
}
