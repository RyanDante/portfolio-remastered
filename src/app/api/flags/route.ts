import { NextResponse } from "next/server";
import type { FeatureFlag } from "@/types";

// Default flags — override from Firestore in production
const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    id: "maintenance_mode",
    label: "Maintenance Mode",
    description: "Show maintenance banner and disable feedback form",
    enabled: false,
  },
  {
    id: "show_terminal",
    label: "Show Terminal Section",
    description: "Toggle visibility of the interactive terminal",
    enabled: true,
  },
  {
    id: "show_logs",
    label: "Show Live Logs",
    description: "Toggle visibility of the live system logs feed",
    enabled: true,
  },
  {
    id: "show_systems",
    label: "Show Systems Section",
    description: "Toggle visibility of the infrastructure nodes",
    enabled: true,
  },
  {
    id: "ai_enabled",
    label: "AI Terminal (ARIA)",
    description: "Enable the Gemini AI assistant in the terminal",
    enabled: true,
  },
];

export async function GET() {
  return NextResponse.json({ flags: DEFAULT_FLAGS });
}

export async function POST(req: Request) {
  try {
    const { id, enabled } = (await req.json()) as { id: string; enabled: boolean };
    const flag = DEFAULT_FLAGS.find((f) => f.id === id);
    if (!flag) return NextResponse.json({ error: "Flag not found" }, { status: 404 });
    flag.enabled = enabled;
    return NextResponse.json({ success: true, flag });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
