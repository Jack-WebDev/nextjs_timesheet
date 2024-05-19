"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCalendar } from "react-icons/fa";
import axios from "axios";
import { getSession } from "@/actions";

export default function Dashboard() {
  const [totalProjects, setTotalProjects] = useState<number>(0);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const data = await getSession();

    const response = await axios.get("http://localhost:3000/api/projects");
    const projects = response.data;

    const userProjects = projects.filter((project: { AssignedUsers: any[] }) =>
      project.AssignedUsers.some(
        (assignedUser) => assignedUser.user.Email === data.Email
      )
    );

    setTotalProjects(userProjects.length);
  };

  return (
    <div className="grid grid-cols-2 gap-12">
      <Link href={"/users/employee/projects"}>
        <Card className="bg-white border border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-4 text-secondary font-bold">
              <FaCalendar fill="#d69436" fontSize={"2rem"} />
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-semibold">{totalProjects}</h2>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
