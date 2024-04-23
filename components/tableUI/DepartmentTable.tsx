import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditDepartment } from "../dialogUI/EditDepartment";
import { AddDepartment } from "../dialogUI/AddDepartment";
import { FaTrashAlt } from "react-icons/fa";
import {toast} from "react-toastify"

type Department = {
	id: string;
	Department_Name: string;
	Total_Projects: string;
};

const departmentTable: React.FC = () => {
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
			const response = await axios.get<Department[]>("api/departments/");
			setdepartments(response.data);
			setfilteredDepartments(response.data);
		} catch (error) {
			toast.error("An error occured while fetching departments. Please try again.");
		}
	};

	const handleDelete = async (id: any) => {
		 await axios.delete(`api/departments/${id}`);
		fetchDepartments();
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
		<div className="w-1/2 mx-auto  mt-12 border border-black p-8 rounded-2xl">
			<div className="flex items-center justify-between mb-12">
				<input
					type="text"
					placeholder="Filter by department..."
					className="filter_input w-1/2 px-8 border border-black focus:border-[#DDA83A]"
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
							<td>{department.Total_Projects}</td>
							<td className="flex items-center justify-center gap-4">
								<EditDepartment id={department.id} />
								<FaTrashAlt className="cursor-pointer" onClick={() => handleDelete(department.id)}/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default departmentTable;
