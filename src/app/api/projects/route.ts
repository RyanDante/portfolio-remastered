import { NextResponse } from "next/server";
import { PROJECTS } from "@/data/projects";

export const dynamic = "force-static";

export async function GET() {
  const publicProjects = PROJECTS
    .filter((p) => !p.archived)
    .sort((a, b) => a.order - b.order);

  return NextResponse.json({ projects: publicProjects });
}
