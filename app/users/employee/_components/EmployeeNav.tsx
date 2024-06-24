"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaAlignCenter,
  FaTasks,
  FaClock,
  FaCheck,
  FaInfoCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { FaBookmark, FaGear } from "react-icons/fa6";
import Image from "next/image";
import React from "react";

export default function EmployeeNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full">
      <div className="grid grid-rows-[.4fr 1fr] w-[15%] h-full bg-[rgba(162,161,168,0.05)] fixed">
        <>
          <Link href={"/users/employee"}>
            <Image
              src={"/ndt-technologies-web-logo.svg"}
              alt=""
              width={100}
              height={100}
              className="mt-8 mx-auto"
              style={{ width: "50%", height: "auto" }}
            />
            <h2 className="text-center text-primary font-bold text-xl">
              New Dawn <span className="text-secondary">360</span>
            </h2>
          </Link>
          <ul className="flex flex-col mx-8 gap-8">
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
              href={"/users/employee/help"}
              className={`link flex items-center gap-x-2 ${
                pathname === "/users/employee/help" ? "active" : ""
              }`}
            >
              <FaInfoCircle />
              Help Desk
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
              href={"/users/employee/Approvals"}
              className={`link flex items-center gap-x-2 ${
                pathname === "/users/employee/Approvals" ? "active" : ""
              }`}
            >
              <FaCheck />
              Approvals
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
          <div className="flex items-center justify-center">
            <button className="flex items-center gap-x-1 bg-primary text-white py-2 px-4 rounded-s-xl"><FaSun/>Light</button>
            <button className="flex items-center gap-x-1 bg-gray-100 py-2 px-4 rounded-e-xl"><FaMoon/>Dark</button>
          </div>
        </>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
