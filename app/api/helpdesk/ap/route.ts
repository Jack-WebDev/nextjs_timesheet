import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";

export async function GET() {
  try {
    const ap = await db.aP.findMany();
    return NextResponse.json(ap, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  try {
    const apId = await db.aP.create({
      data: {
        property: data.property,
        contactPerson: data.contactPerson,
        contactNo: data.contactNo,
      },
    });

    console.log(apId);

    const helpDesk = await db.helpDesk.create({
      data: {
        apId: apId.id,
        date: data.date,
        callDuration: data.duration,
        campus: data.campus,
        query: data.query,
        resolve: data.resolve,
        client: data.client,
        problem: data.problem,
        status: data.status,
        callAgent: data.callAgent,
      },
    });

    return NextResponse.json(helpDesk, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
