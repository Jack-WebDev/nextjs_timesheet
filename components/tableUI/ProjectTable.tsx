import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditProject } from "../dialogUI/EditProject";
import { AddProject } from "../dialogUI/AddProject";
import { FaTrashAlt } from "react-icons/fa";
import {toast} from "react-toastify"

type Project = {
	id: string;
	Project_Name: string;

	Department_Name: string;
};

const ProjectTable: React.FC = () => {
	const [projects, setprojects] = useState<Project[]>([]);
	const [filteredprojects, setFilteredprojects] = useState<Project[]>([]);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		fetchprojects();
	}, []);

	const fetchprojects = async () => {
		try {
			const response = await axios.get<Project[]>("api/projects/");
			setprojects(response.data);
			setFilteredprojects(response.data);
		} catch (error) {
			toast.error("An error occured while fetching projects. Please try again.");
		}
	};

	const handleDelete = async (id: any) => {
		await axios.delete(`api/projects/${id}`);
		fetchprojects();
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = projects.filter((project) =>
			project.Project_Name.toLowerCase().includes(searchTerm)
		);
		setFilteredprojects(filtered);
	};

	return (
		<div className="w-1/2 mx-auto mt-12 border border-black p-8 rounded-2xl ">
			<div className="flex items-center justify-between mb-12">
				<input
					type="text"
					placeholder="Filter by project name..."
					className="filter_input w-1/2 px-8 border border-black focus:border-[#DDA83A]"
					value={filter}
					onChange={handleFilterChange}
				/>
				<AddProject />

			</div>
			<table className="w-full">
				<thead className="relative -top-4">
					<tr className="text-left text-gray-500">
						<th className=" font-normal">Project Name</th>

						<th className=" font-normal">Department</th>

						<th className=" font-normal">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredprojects.map((project) => (
						<tr key={project.id}>
							<td>{project.Project_Name}</td>

							<td>{project.Department_Name}</td>

							<td className="flex items-center justify-center gap-4">
								<EditProject id={project.id} />
								<FaTrashAlt className="cursor-pointer" onClick={() => handleDelete(project.id)}/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectTable;
