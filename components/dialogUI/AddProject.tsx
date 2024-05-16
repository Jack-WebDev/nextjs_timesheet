"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

type Department = {
	id: string;
	Department_Name: string;
};

type Project = {
	Project_Name: string;

	Department: string;
};

export function AddProject() {
	const [Project_Name, setProject_Name] = useState("");
	const [department_id, setDepartment_id] = useState("");
	const [departments, setDepartments] = useState<Department[]>([]);

	useEffect(() => {
		fetchdepartments();
	}, []);

	const fetchdepartments = async () => {
		try {
			const response = await axios.get<Department[]>(
				"http://localhost:3000/api/departments/"
			);
			setDepartments(response.data);
		} catch (error) {
			toast.error(
				"An error occured while fetching departments. Please reload the screen and try again."
			);
		}
	};

	const handleSave = async () => {
		await axios.post<Project>(`http://localhost:3000/api/projects/`, {
			Project_Name: Project_Name,
			Department_Id: department_id,
		});
		window.location.reload();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary">
					<FaPlusCircle />
					Add New Project
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Project</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Project Name
						</Label>
						<Input
							id="name"
							value={Project_Name}
							className="col-span-3 rounded-xl focus:border-primary"
							onChange={(e) => setProject_Name(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Department Name
						</Label>
						<select
							name="department"
							className="focus:border-primary"
							value={department_id}
							onChange={(e) => setDepartment_id(e.target.value)}
						>
							<option value={""}>Select Department</option>
							{departments.map((department) => (
								<option key={department.id} value={department.id}>
									{department.Department_Name}
								</option>
							))}
						</select>
					</div>
				</div>

				<DialogFooter>
					<Button
						type="submit"
						className="bg-primary text-white rounded-xl hover:bg-primary"
						onClick={handleSave}
					>
						Add Project
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}