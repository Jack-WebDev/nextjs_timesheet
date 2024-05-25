"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FaAlignCenter,
	FaCalendarCheck,
	FaClock,
	FaTasks,
} from "react-icons/fa";
import {FaBookmark, FaGear} from "react-icons/fa6"

function NavMenu() {
	const pathname = usePathname();
	return (
		<>
			<div className="side_menu w-[15%] bg-[#a2a1a81a] grid  justify-center items-baseline">
				<Link href={"/users/manager"}>
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
						href={"/users/manager"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/manager" ? "active" : ""
						}`}
					>
						<FaAlignCenter />
						Dashboard
					</Link>

					<Link
						href={"/users/manager/projects"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/manager/projects" ? "active" : ""
						}`}
					>
						<FaCalendarCheck />
						Projects
					</Link>
					<Link
						href={"/users/manager/tasks"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/manager/tasks" ? "active" : ""
						}`}
					>
						<FaTasks />
						Tasks
					</Link>
					<Link
						href={"/users/manager/bookings"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/manager/bookings" ? "active" : ""
						}`}
					>
						<FaBookmark />
						Bookings
					</Link>
					<Link
						href={"/users/manager/timesheets"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/manager/timesheets" ? "active" : ""
						}`}
					>
						<FaClock />
						Timesheets
					</Link>
                    <Link
						href={"/users/manager/reports"}
						className={`link flex items-center gap-x-2 ${
							pathname === "/users/manager/reports" ? "active" : ""
						}`}
					>
						<FaCalendarCheck />
						Reports
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
