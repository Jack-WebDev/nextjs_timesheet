"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaAlignCenter,
  FaCalendarCheck,
  FaTasks,
  FaClock,
} from "react-icons/fa";
import { FaBookmark, FaGear } from "react-icons/fa6";

function EmployeeNavMenu() {
  const pathname = usePathname();
  return (
    <>
      <div className="side_menu w-[15%] bg-[#a2a1a81a] grid  justify-center items-baseline">
        <Link href={"/users/employee"}>
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
            href={"/users/employee"}
            className={`link flex items-center gap-x-2 ${
              pathname === "/users/employee" ? "active" : ""
            }`}
          >
            <FaAlignCenter />
            Dashboard
          </Link>

          <Link
            href={"/users/employee/Tasks"}
            className={`link flex items-center gap-x-2 ${
              pathname === "/users/employee/Tasks" ? "active" : ""
            }`}
          >
            <FaTasks />
            Tasks
          </Link>

          <Link
            href={"/users/employee/Bookings"}
            className={`link flex items-center gap-x-2 ${
              pathname === "/users/employee/Bookings" ? "active" : ""
            }`}
          >
            <FaBookmark />
            Bookings
          </Link>

          <Link
            href={"/users/employee/timesheet"}
            className={`link flex items-center gap-x-2 ${
              pathname === "/users/employee/timesheet" ? "active" : ""
            }`}
          >
            <FaClock />
            Timesheets
          </Link>

          <Link
            href={"/users/employee/settings"}
            className={`link flex items-center gap-x-2 ${
              pathname === "/users/employee/settings" ? "active" : ""
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

export default EmployeeNavMenu;
