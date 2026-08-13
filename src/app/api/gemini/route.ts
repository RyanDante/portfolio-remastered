import { NextRequest, NextResponse } from "next/server";
import { queryGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body as { prompt?: string };

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const response = await queryGemini(prompt.trim().slice(0, 1000));
    return NextResponse.json({ response });
  } catch (err) {
    console.error("[API /gemini]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
