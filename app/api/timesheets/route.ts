import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";

export async function GET() {
	try {
		const res = await db.timesheet.findMany();
		
		const sortedTimesheets = res.sort((a, b) => {
			if (a.Approval_Status === 'Pending' && b.Approval_Status !== 'Pending') {
			  return -1;
			}
			if (a.Approval_Status !== 'Pending' && b.Approval_Status === 'Pending') {
			  return 1;
			}
			return 0;
		  });
	  

		return NextResponse.json(sortedTimesheets, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const res = await req.json();
		const { formData } = await res;

		const timesheetData = await db.timesheet.create({
			data: {
				Full_Name: formData.fullName,
				Project_Name: formData.project,
				Task_performed: formData.task_performed,
				Week: formData.period,
				Monday: formData.hours[0],
				Tuesday: formData.hours[1],
				Wednesday: formData.hours[2],
				Thursday: formData.hours[3],
				Friday: formData.hours[4],
				Total_hours: formData.total_hours,
			},
		});

		return NextResponse.json(timesheetData, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
