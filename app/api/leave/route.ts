import { NextResponse } from "next/server";
import db from "@/database/index";

export async function GET() {
  try {
    const res = await db.leaveRequest.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
