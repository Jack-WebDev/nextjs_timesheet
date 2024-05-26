"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCalendar } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
	const [totalProjects, setTotalProjects] = useState<number>(0);


	useEffect(() => {
		getProjects();
	}, []);


	const getProjects = async () => {
		const res = await axios.get("http://localhost:3000/api/projects/");
		const projects = res.data;
		setTotalProjects(projects.length);
	};


	return (
		<div className="grid grid-cols-2 gap-12">
			<Link href={"/users/exec/projects"}>
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
