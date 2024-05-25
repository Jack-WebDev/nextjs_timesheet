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
        const { formData } = await res;
        const { combinedData } = await formData;
    
        const mapped = combinedData.timesheet.map((i: any) => {
          return {
            weekday: i.weekday.toString(),
            totalHours: i.totalHours,
            tasks: {
              create: i.tasks.map((task: any) => ({
                taskPerformed: task.taskPerformed,
                taskStatus: task.taskStatus,
              })),
            },
            comment: i.comment,
          };
        });
    
        try {

            const detailsID = await db.tableDetails.update({
                where: {
                    id: params.id
                }, 
                data: {
                    month: combinedData.month,
                    weeklyPeriod: combinedData.weeklyPeriod,
                    name: combinedData.name,
                    projectManager: combinedData.projectManager,
                    projectName: combinedData.projectName,
                    role: combinedData.role,
                    Approval_Status: combinedData.Approval_Status,
                }
            })
    
          for (const entry of mapped) {
            const s = await db.tableRow.update({
                where: {
                    id:params.id //TODO: EACH TABLE HAS IT'S OWN ID!!!!!!!!!
                },
                data: {
                    comment: entry.comment,
                    totalHours: entry.totalHours,
                    weekday: entry.weekday,
                    tasks: entry.tasks,
                    userId: combinedData.userID,
                    tableDetailsId: detailsID.id,
                  },
            });
    
            console.log(s)
          }
          console.log("Data inserted successfully.");
        } catch (error) {
          console.error("Error inserting data:", error);
        }
    
        return NextResponse.json(combinedData, { status: 201 });
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
}
