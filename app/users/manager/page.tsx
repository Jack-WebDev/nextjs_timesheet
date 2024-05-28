"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { FaCalendar, FaClock } from "react-icons/fa";
import { useUser } from "@/app/store";
import useFetchProjects from "@/hooks/useFetchProjects";
import useFetchTimesheets from "@/hooks/useFetchTimesheets";
import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
  const projectsData = useFetchProjects();
  const timesheetData = useFetchTimesheets();
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [totalTimesheets, setTotalTimesheets] = useState<number>(0);
  const user = useUser();

  useEffect(() => {
    if (timesheetData) {
      const formattedUserFullName =
        `${user.Name.trim()} ${user.Surname.trim()}`.toLowerCase();

      const userTimesheets = timesheetData.filter((timesheet: any) => {
        const formattedProjectManagerName = timesheet.projectManager
          .trim()
          .toLowerCase();
        return (
          formattedProjectManagerName === formattedUserFullName &&
          timesheet.Approval_Status === "Pending"
        );
      });

      setTotalTimesheets(userTimesheets.length);
    }
  }, [timesheetData, user.Name, user.Surname]);

  useEffect(() => {
    if (projectsData) {
      const userProjects = projectsData.filter(
        (project) =>
          project.Project_Manager.toLowerCase() ===
          `${user.Name.trim()} ${user.Surname.trim()}`.toLowerCase()
      );

      setTotalProjects(userProjects.length);
    }
  }, [projectsData, user.Name, user.Surname]);

  return (
    <div className="grid grid-cols-2 gap-12">
      <Link href={"/users/manager/projects"}>
        <DashboardCard
          icon={FaCalendar}
          total={totalProjects}
          title="Total Projects"
        />
      </Link>
      <Link href={"/users/manager/timesheets"}>
        <DashboardCard
          icon={FaClock}
          total={totalTimesheets}
          title="Pending Timesheet Approvals"
        />
      </Link>
    </div>
  );
}
