"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditDepartment } from "../dialogUI/EditDepartment";
import { AddDepartment } from "../dialogUI/AddDepartment";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

type Department = {
	id: string;
	Department_Name: string;
	projects: string[];
};

const DepartmentTable: React.FC = () => {
	const [departments, setdepartments] = useState<Department[]>([]);
	const [filteredDepartments, setfilteredDepartments] = useState<Department[]>(
		[]
	);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		fetchDepartments();
	}, []);

	const fetchDepartments = async () => {
		try {
			const response = await axios.get<Department[]>(
				"http://localhost:3000/api/departments"
			);
			setdepartments(response.data);
			setfilteredDepartments(response.data);
		} catch (error) {
			toast.error(
				"An error occured while fetching departments. Please reload the screen and try again.."
			);
		}
	};

	const handleDelete = async (id: any) => {
		try {
			await axios.delete(`http://localhost:3000/api/departments/${id}`);
			fetchDepartments();
			toast.success("Department deleted successfully");
		} catch (error) {
			toast.error(
				"An error occured while deleting department. Please reload and try again."
			);
		}
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = departments.filter((department) =>
			department.Department_Name.toLowerCase().includes(searchTerm)
		);
		setfilteredDepartments(filtered);
	};

	return (
		<div className="w-[60%] mx-auto  mt-12 bg-white border-2 border-primary p-8 rounded-2xl">
			<div className="flex items-center justify-between mb-12">
				<input
					type="text"
					placeholder="Filter by department..."
					className="filter_input w-1/2 px-8 py-[5px] border border-black focus:border-primary"
					value={filter}
					onChange={handleFilterChange}
				/>
				<AddDepartment />
			</div>
			<table className="w-full">
				<thead className="relative -top-4">
					<tr className="text-left text-gray-500">
						<th className=" font-normal">Department Name</th>
						<th className=" font-normal">No. of projects</th>

						<th className=" font-normal">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredDepartments.map((department) => (
						<tr key={department.id}>
							<td>{department.Department_Name}</td>
							<td>{department.projects.length}</td>
							<td className="flex items-center justify-center gap-4">
								<EditDepartment id={department.id} />
								<FaTrashAlt
									className="cursor-pointer"
									onClick={() => handleDelete(department.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DepartmentTable;