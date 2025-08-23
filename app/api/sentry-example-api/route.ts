import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    data: "Hello! This is a working API route without Sentry.",
  });
}
