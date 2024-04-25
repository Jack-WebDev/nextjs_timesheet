"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditUser } from "../dialogUI/EditUser";
import { AddUser } from "../dialogUI/AddUser";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

type User = {
	[x: string]: any;

	id: string;
	Name: string;
	Surname: string;
	Email: string;
	Password: string;
	Department: string;
	Status: string;
	Role: string;
};

const UserTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get<User[]>(
				"http://localhost:3000/api/users"
			);
			const users = response.data;
			setUsers(users);
			setFilteredUsers(users);
		} catch (error) {
			toast.error(
				"An error occured while fetching users. Please reload the screen and try again."
			);
		}
	};

	const handleDelete = async (id: any) => {
		try {
			await axios.delete(`api/users/${id}`);
			fetchUsers();
			toast.success("User deleted successfully");
		} catch (error) {
			toast.error(
				"An error occured while deleting user. Please reload and try again."
			);
		}
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = users.filter(
			(user) =>
				user.Name.toLowerCase().includes(searchTerm) ||
				user.Department.toLowerCase().includes(searchTerm) ||
				user.Status.toLowerCase().includes(searchTerm)
		);
		setFilteredUsers(filtered);
	};

	return (
		<div className="w-[70%] mx-auto mt-12 border-2 bg-white broder-2 border-primary p-8 rounded-2xl ">
			<div className="flex items-center justify-between mb-12">
				<input
					type="text"
					placeholder="Filter by name, department, or status..."
					className="filter_input w-1/2 px-4 py-[5px] border border-black focus:border-primary"
					value={filter}
					onChange={handleFilterChange}
				/>
				<AddUser />
			</div>
			<table className="w-full">
				<thead className="relative -top-4">
					<tr className="text-left text-gray-500">
						<th className="font-normal">Name</th>
						<th className=" font-normal">Surname</th>
						<th className=" font-normal">Email</th>
						<th className=" font-normal">Department</th>
						<th className=" font-normal">Status</th>
						<th className=" font-normal">Role</th>
						<th className=" font-normal">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<tr key={user.id}>
							<td>{user.Name}</td>
							<td>{user.Surname}</td>
							<td>{user.Email}</td>
							<td>{user.Department}</td>
							<td>{user.Status}</td>
							<td>{user.Role}</td>
							<td className="flex items-center justify-center gap-4">
								<EditUser id={user.id} />
								<FaTrashAlt
									className="cursor-pointer"
									onClick={() => handleDelete(user.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
