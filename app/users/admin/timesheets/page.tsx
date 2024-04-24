
"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

const Timesheets = () => {
	const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
	const [expandedStates, setExpandedStates] = useState(
		timesheets.map(() => false)
	);

	const toggleShowMore = (index: number) => {
		const newExpandedStates = [...expandedStates];
		newExpandedStates[index] = !newExpandedStates[index];
		setExpandedStates(newExpandedStates);
	};

	useEffect(() => {
		const fetchTimesheets = async () => {
			try {
				const response = await axios.get("api/timesheets");

				setTimesheets(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchTimesheets();
	}, []);

	const handleApprove = async (id: string, approval: string) => {
		try {
			await axios.put(`api/timesheets/${id}`, {
				approval,
			});
			window.location.reload();
		} catch (error) {
			toast.error(
				"An error occured while Approving timesheet. Please try again."
			);
		}
	};

	const handleReject = async (id: string, approval: string) => {
		try {
			await axios.put(`api/timesheets/${id}`, {
				approval,
			});
			window.location.reload();
		} catch (error) {
			toast.error(
				"An error occured while Rejecting timesheet. Please try again."
			);
		}
	};

	return (
		<div>

			<div className="timesheets-container w-1/2 mx-auto flex justify-center flex-wrap gap-x-20 gap-y-8">
				{timesheets.map((timesheet, index) => (
					<div
						className="card__container h-fit border border-black rounded-xl p-4"
						key={timesheet.id}
					>
						<>
							<div className="card__head grid gap-4">
								<h1 className="font-bold">Full Name: {timesheet.Full_Name}</h1>
								<h2>Project Name: {timesheet.Project_Name}</h2>
							</div>
							<div className="card__body grid gap-4">
								<div>
									<h2>Task Performed: {timesheet.Task_performed}</h2>
									<h3 className="font-bold">Calendar Week: {timesheet.Week}</h3>
								</div>

								{expandedStates[index] && (
									<div className="week-days__container">
										<h4 className="font-bold">Daily Hours</h4>
										<div className="week-days grid gap-2">
											<span>Monday: {timesheet.Monday} hours</span>
											<span>Tuesday: {timesheet.Tuesday} hours</span>
											<span>Wednesday: {timesheet.Wednesday} hours</span>
											<span>Thursday: {timesheet.Thursday} hours</span>
											<span>Friday: {timesheet.Friday} hours</span>
										</div>
										<h4 className="font-bold">
											Total hours worked: {timesheet.Total_hours}
										</h4>
										<br />
										<h3>Approval Status: {timesheet.Approval_Status}</h3>
									</div>
								)}

								<button
									type="button"
									onClick={() => toggleShowMore(index)}
									className="text-blue-500"
								>
									{expandedStates[index] ? "Show less" : "Show more"}
								</button>

								<div className="buttons flex items-center justify-center gap-x-8">
									<button
										type="button"
										className="bg-[#00ed64] px-4 py-2 rounded-xl"
										onClick={() => handleApprove(timesheet.id, "Approved")}
									>
										Approve
									</button>
									<button
										type="button"
										className="bg-red-600 text-white px-4 py-2 rounded-xl"
										onClick={() => handleReject(timesheet.id, "Rejected")}
									>
										Reject
									</button>
								</div>
							</div>
						</>
					</div>
				))}
			</div>
		</div>
	);
};

export default Timesheets;
