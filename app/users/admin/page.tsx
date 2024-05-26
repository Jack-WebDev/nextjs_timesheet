"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBuilding, FaCalendar, FaTasks, FaUsers } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [totalProjects, setTotalProjects] = useState<number>(0);
	const [totalDepartments, setTotalDepartments] = useState<number>(0);

	useEffect(() => {
		getUsers();
		getDepartments();
		getProjects();
	}, []);

	const getUsers = async () => {
		const res = await axios.get("http://localhost:3000/api/users/");
		const users = res.data;
		setTotalUsers(users.length);
	};
	const getProjects = async () => {
		const res = await axios.get("http://localhost:3000/api/projects/");
		const projects = res.data;
		setTotalProjects(projects.length);
	};
	const getDepartments = async () => {
		const res = await axios.get("http://localhost:3000/api/departments/");
		const departments = res.data;
		setTotalDepartments(departments.length);
	};


	return (
		<div className="grid grid-cols-2 gap-12">
			<Link href={"/users/admin/employees"}>
				<Card className="bg-white border border-primary">
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4 text-secondary font-bold">
							<FaUsers fill="#d69436" fontSize={"2rem"} />
							Total Employees
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="font-semibold">{totalUsers}</h2>
					</CardContent>
				</Card>
			</Link>
			<Link href={"/users/admin/departments"}>
				<Card className="bg-white border border-primary">
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4 text-secondary font-bold">
							<FaBuilding fill="#d69436" fontSize={"2rem"} />
							Total Departments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="font-semibold">{totalDepartments}</h2>
					</CardContent>
				</Card>
			</Link>
			<Link href={"/users/admin/projects"}>
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
