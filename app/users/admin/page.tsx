"use client";

import Link from "next/link";

import { FaBuilding, FaCalendar, FaUsers } from "react-icons/fa";
import useFetchProjects from "@/hooks/useFetchProjects";
import useFetchDepartments from "@/hooks/useFetchDepartments";
import useFetchUsers from "@/hooks/useFetchUsers";
import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
  const projects = useFetchProjects();
  const departments = useFetchDepartments();
  const users = useFetchUsers();
  const totalUsers = users.length;
  const totalDepartments = departments.length;
  const totalProjects = projects.length;

  return (
    <div className="grid grid-cols-2 gap-12">
      <Link href={"/users/admin/employees"}>
        <DashboardCard
          icon={FaUsers}
          total={totalUsers}
          title="Total Employees"
        />
      </Link>
      <Link href={"/users/admin/departments"}>
        <DashboardCard
          icon={FaBuilding}
          total={totalDepartments}
          title="Total Departments"
        />
      </Link>
      <Link href={"/users/admin/projects"}>
        <DashboardCard
          icon={FaCalendar}
          total={totalProjects}
          title="Total Projects"
        />
      </Link>
    </div>
  );
}
