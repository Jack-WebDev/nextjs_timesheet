import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {

		const timesheetData = await db.timesheet.findFirst({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json(timesheetData, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}


export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const res = await req.json();
		const { Approval_Status } = await res;
		console.log(Approval_Status)
		const id = params.id;


		const timesheetData = await db.timesheet.update({
			where: {
				id: id,
			},
			data: {
				Approval_Status: Approval_Status,
			},
		});

		return NextResponse.json(timesheetData, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
