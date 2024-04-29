"use client";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { FaChevronDown } from "react-icons/fa";
import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useEffect, useState } from "react";
import Card from "@/components/timesheet/Card";
import { format } from "date-fns";
import { logOut } from "@/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
	const [name, setName] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedName = localStorage.getItem("user");
			setName(storedName);
		}
	}, []);

	const formatDateToString = (date: Date | null): string => {
		return date ? format(date, "dd/MM/yyyy") : "";
	};

	const handleUpdateDateRange = (startDate: Date, endDate: Date) => {
		setSelectedStartDate(startDate);
		setSelectedEndDate(endDate);

		const date = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

		if (typeof localStorage !== "undefined") {
			localStorage.setItem("week", date);
		} else {
			console.error("localStorage is not available.");
		}
	};

	return (
		<div>
			<header className="flex justify-between items-center py-4 ml-[10rem] mr-[10rem]">
				<Image
					src={"/ndt-technologies-web-logo.svg"}
					alt=""
					width={50}
					height={50}
				/>
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
			
			<>
			<Dialog defaultOpen>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="mb-4">How to use the timesheet</DialogTitle>
						<DialogDescription className="text-xl">
							1. Select the start date and end date of the week you&apos;re submitting for.<br/>
							2. Select the project you worked on.<br/>
							3. Describe the task you performed.<br/>
							4. Add a new row if you worked on more than 1 project.<br/>
							5. Submit each row.<br/>
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center space-x-2"></div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button type="button" variant="secondary" className="text-white rounded-xl">
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			</>
			
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
