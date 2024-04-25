"use client";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useState } from "react";
import Card from "@/components/timesheet/Card";
import { format } from "date-fns";
import { logOut } from "@/actions";

type Timesheet = {
	Friday: string;
	Monday: string;
	Project_Name: string;
	Task_performed: string;
	Thursday: string;
	Total_hours: string;
	Tuesday: string;
	Wednesday: string;
	Week: string;
	Full_Name: string;
	id: string;
	Approval_Status: string;
};

const Timesheet = () => {
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
		new Date()
	);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
		new Date()
	);

	const name = localStorage.getItem("user");

	const formatDateToString = (date: Date | null): string => {
		return date ? format(date, "yyyy-MM-dd") : "";
	};

	const handleUpdateDateRange = (startDate: Date, endDate: Date) => {
		setSelectedStartDate(startDate);
		setSelectedEndDate(endDate);

		const date = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

		localStorage.setItem("week", date);
	};

	return (
		<div>
			<header className="flex justify-between items-center py-4 ml-[10rem] mr-[10rem]">
				<img src="/ndt-technologies-web-logo.svg" alt="" className="w-[7%]" />
				<div className="profile flex items-center gap-x-3">
					<Popover>
						<PopoverTrigger className="flex items-center gap-4 text-primary font-semibold">
							{name} <FaChevronDown />
						</PopoverTrigger>
						<PopoverContent className="flex items-center gap-4 w-fit border-2 border-primary">
							<form action={logOut}>
								<button type="submit">Log Out</button>
							</form>
						</PopoverContent>
					</Popover>
				</div>
			</header>

			<hr />

			<main>
				<div className="flex justify-center gap-x-12">
					<DateRangeSelector onUpdateDateRange={handleUpdateDateRange} />

					<div className="timesheet__details flex items-center justify-around mt-12">
						<div className="time__period flex items-center gap-x-4">
							<h2 className="font-semibold">Week:</h2>
							<span className="bg-primary text-white p-2 rounded-xl">
								{formatDateToString(selectedStartDate)} -{" "}
								{formatDateToString(selectedEndDate)}
							</span>
						</div>
					</div>
				</div>
				<div className="timesheet__container">
					<Card />
				</div>
			</main>
		</div>
	);
};

export default Timesheet;
