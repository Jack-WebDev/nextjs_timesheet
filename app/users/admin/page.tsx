import Link from "next/link";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FaBuilding, FaCalendar, FaTasks, FaUsers } from "react-icons/fa";

export default function page() {
	return (
		<div className="grid grid-cols-2 gap-12">
			<Link href={"/users/admin/employees"}>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
							<FaUsers fill="#d69436" fontSize={"2rem"} />
							Total Employees
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="font-semibold">0</h2>
					</CardContent>
				</Card>
			</Link>
			<Link href={"/users/admin/departments"}>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
							<FaBuilding fill="#d69436" fontSize={"2rem"} />
							Total Departments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="font-semibold">0</h2>
					</CardContent>
				</Card>
			</Link>
			<Link href={"/users/admin/projects"}>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
							<FaCalendar fill="#d69436" fontSize={"2rem"} />
							Total Projects
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="font-semibold">0</h2>
					</CardContent>
				</Card>
			</Link>
			<Link href={"/users/admin/timesheets"}>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
							<FaTasks fill="#d69436" fontSize={"2rem"} />
							Timesheet Approvals
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="font-semibold">0</h2>
					</CardContent>
				</Card>
			</Link>
		</div>
	);
}
