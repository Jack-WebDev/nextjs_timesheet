"use client";

import Link from "next/link";

import { FaCalendar, FaClock } from "react-icons/fa";
import DashboardCard from "@/components/DashboardCard";
import useFetchProjects from "@/hooks/useFetchProjects";
import useFetchTimesheets from "@/hooks/useFetchTimesheets";
import { useEffect, useState } from "react";
import { useUser } from "@/app/store";

export default function Dashboard() {
  const projects = useFetchProjects();
  const timesheetData = useFetchTimesheets();
  const user = useUser();
  const totalProjects = projects.length;
  const [totalTimesheets, setTotalTimesheets] = useState<number>(0);

  useEffect(() => {
    if (timesheetData) {
      const formattedUserFullName =
        `${user.Name.trim()} ${user.Surname.trim()}`.toLowerCase();
      const userTimesheets = timesheetData.filter((timesheet) => {
        const formattedProjectManagerName = timesheet.projectManager
          .trim()
          .toLowerCase();
        const isApprovedBy = timesheet.Approval_Status.includes("Approved by");
        const isRejectedBy = timesheet.Approval_Status.includes("Rejected by");

        return (
          isApprovedBy ||
          isRejectedBy ||
          (formattedProjectManagerName === formattedUserFullName &&
            timesheet.Approval_Status.includes("Pending"))
        );
      });

      setTotalTimesheets(userTimesheets.length);
    }
  }, [timesheetData, user.Name, user.Surname]);

  return (
    <div className="grid grid-cols-2 gap-12">
      <Link href={"/users/exec/projects"}>
        <DashboardCard
          icon={FaCalendar}
          total={totalProjects}
          title="Total Projects"
        />{" "}
      </Link>
      <Link href={"/users/exec/timesheets"}>
        <DashboardCard
          icon={FaClock}
          total={totalTimesheets}
          title="Pending Timesheet Approvals"
        />
      </Link>
    </div>
  );
}
