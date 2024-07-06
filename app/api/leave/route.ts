import { NextResponse } from "next/server";
import db from "@/database/index";

export async function GET() {
  try {
    const res = await db.leaveRequest.findMany({
      select: {
        userId: true,
        fullName: true,
        reason: true,
        date: true,
        totalHours: true,
        totalDays: true,
        requestFor: true,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
