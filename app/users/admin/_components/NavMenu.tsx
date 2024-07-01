"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FaAlignCenter,
	FaBuilding,
	FaCalendarCheck,
	FaTasks,
	FaUsers,
} from "react-icons/fa";
import {FaBookmark, FaGear} from "react-icons/fa6"

function NavMenu() {
	const pathname = usePathname();
	return (
		<>
			<div className="side_menu w-[15%] bg-[#a2a1a81a] grid  justify-center items-baseline">
				<Link href={"/users/admin"}>
					<Image
						src={"/ndt-technologies-web-logo.svg"}
						alt=""
						width={100}
						height={100}
						style={{ width: "auto", height: "auto" }}
					/>
				</Link>
				<ul className="grid gap-8">
					<Link
						href={"/users/admin"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/admin" ? "active" : ""
						}`}
					>
						<FaAlignCenter />
						Dashboard
					</Link>
					<Link
						href={"/users/admin/employees"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/admin/employees" ? "active" : ""
						}`}
					>
						<FaUsers />
						Employees
					</Link>
					<Link
						href={"/users/admin/departments"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/admin/departments" ? "active" : ""
						}`}
					>
						<FaBuilding />
						Departments
					</Link>
					<Link
						href={"/users/admin/projects"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/admin/projects" ? "active" : ""
						}`}
					>
						<FaCalendarCheck />
						Projects
					</Link>
					<Link
						href={"/users/admin/bookings"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/admin/bookings" ? "active" : ""
						}`}
					>
						<FaBookmark />
						Bookings
					</Link>
					<Link
						href={"/users/settings"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/settings" ? "active" : ""
						}`}
					>
						<FaGear />
						Settings
					</Link>
				</ul>
			</div>
		</>
	);
}

export default NavMenu;
