import { NextResponse, NextRequest } from "next/server";
import db from "@/database/index";

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const { formData } = await res;
    const { combinedData } = await formData;

    const mapped = combinedData.timesheet.map((i: any) => {
      return {
        weekday: i.weekday.toString(),
        typeOfDay:i.typeOfDay,
        totalHours: i.totalHours,
        totalMinutes: i.totalMinutes,
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
      const detailsID = await db.tableDetails.create({
        data: {
          month: combinedData.month,
          weeklyPeriod: combinedData.weeklyPeriod,
          name: combinedData.name,
          projectManager: combinedData.projectManager,
          projectName: combinedData.projectName,
          role: combinedData.role,
          Approval_Status: combinedData.Approval_Status,
        },
      });

      for (const entry of mapped) {
        const s = await db.tableRow.create({
          data: {
            comment: entry.comment,
            totalHours: entry.totalHours,
            totalMinutes: entry.totalMinutes,
            weekday: entry.weekday,
            tasks: entry.tasks,
            typeOfDay:entry.typeOfDay,
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

export async function GET() {
  try {
    const res = await db.tableDetails.findMany({
      select: {
        id:true,
        month: true,
        name: true,
        projectManager: true,
        projectName: true,
        role: true,
        tableRows: {
          include: {
            tasks: true,
          },
        },
        weeklyPeriod: true,
        Approval_Status:true,
        comments:true,
      
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
