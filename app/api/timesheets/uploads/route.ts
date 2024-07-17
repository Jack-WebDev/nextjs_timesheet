import { NextRequest, NextResponse } from "next/server";
import db from "@/database/index";
import { getSession } from "@/actions/auth/actions";

export async function GET() {
  try {
    const res = await db.tableDetails.findMany({
      select: {
        id: true,
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
        Approval_Status: true,
        comments: true,
        userId: true,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  const fullName = `${session.Name}`;
  const userID = session.id;

  try {
    const reqBody = await req.json();
    const {
      month,
      consultantName,
      position,
      clientName,
      projectName,
      weeklyPeriod,
      date,
      totalHours,
      performedTasks,
      consultantsComment,
    } = await reqBody;
    // console.log(
    //   month,
    //   consultantName,
    //   position,
    //   clientName,
    //   projectName,
    //   weeklyPeriod,
    //   date,
    //   totalHours,
    //   performedTasks,
    //   consultantsComment
    // );

    try {
      const detailsID = await db.tableDetails.create({
        data: {
          month: month,
          weeklyPeriod: weeklyPeriod,
          name: fullName,
          projectManager: "Seleke Masemola",
          projectName: projectName,
          role: position || "N/A",
          Approval_Status: "Pending",
          userId: userID,
        },
      });

      // console.log(detailsID);

      // console.log(date);

      for (let i = 0; i < date.length; i++) {
        console.log(i);
        console.log(date[i]);
        const tableRow = await db.tableRow.create({
          data: {
            weekday: date[i],
            totalHours: parseFloat(totalHours[i]),
            comment: consultantsComment[i],
            typeOfDay: "N/A",
            totalMinutes: 0,
            userId: userID,
            tableDetailsId: detailsID.id,
          },
        });
        // console.log(tableRow);

        if (performedTasks && performedTasks[i]) {
          console.log("Tasks performed:", performedTasks[i]);
          await db.task.create({
            data: {
              taskPerformed: performedTasks[i],
              taskStatus: "N/A",
              projectName: projectName,
              tableRowId: tableRow.id, // Connect task to the created tableRow
            },
          });
        }
      }
      return NextResponse.json("success", { status: 201 });
    } catch (error) {
      console.error("Error inserting data:", error);
    }

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
