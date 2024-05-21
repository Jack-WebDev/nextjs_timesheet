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
import { toast } from "react-toastify";
import { FaEdit, FaEye } from "react-icons/fa";

type User = {
	id: string;
};

export function ViewProject({ id }: User) {
    const [projects,setProjects] = useState([])

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		const response = await axios.get("http://localhost:3000/api/projects");
        setProjects(response.data)
	};



	return (
		<Dialog>
			<DialogTrigger asChild>
				<FaEye className="cursor-pointer" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Project Details</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="projectName" className="text-right">
							Project Name:
						</Label>
						<p>{}</p>
					</div>
                    <div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="projectName" className="text-right">
							Project Description:
						</Label>
						<p>{}</p>
					</div>
                    <div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="projectName" className="text-right">
							Assigned to the project:
						</Label>
						<p>{}</p>
					</div>
			
				</div>
			</DialogContent>
		</Dialog>
	);
}
