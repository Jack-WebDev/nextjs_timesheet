import { NextResponse, NextRequest } from "next/server";
import db from "@/database/index";

export async function GET() {
	try {
		const res = await db.project.findMany({
			select: {
			  id: true,
			  Project_Name: true,
			  Department_Id: true,
			  department: {
				select: {
				  Department_Name: true,
				},
			  },
			},
		  });

		  const data = res.map((i) => {
			return {
				id: i.id,
				Project_Name: i.Project_Name,
				Department_Name: i.department?.Department_Name,
				Department_Id: i.Department_Id
			}
		  })


		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const res = await req.json();
		const { Project_Name, Department_Id } = await res;

		console.log(Project_Name, Department_Id);

		const project = await db.project.create({
			data: {
				Project_Name: Project_Name,
				Department_Id: Department_Id,
			},
		});

		return NextResponse.json(project, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
