"use client";

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
  const [filteredTimesheets, setFilteredTimesheets] = useState<Timesheet[]>([]);
	const [filter, setFilter] = useState<string>("");

  const toggleShowMore = (index: number) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get<Timesheet[]>(
          "http://localhost:3000/api/timesheets"
        );

        console.log(response.data)

        setTimesheets(response.data)
        setFilteredTimesheets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTimesheets();
  }, []);

  const handleApprove = async (id: string, approval: string) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/timesheets/${id}`,
        {
          Approval_Status: approval,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occured while Approving timesheet. Please try again."
      );
    }
  };

  const handleReject = async (id: string, approval: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/timesheets/${id}`,
        {
          Approval_Status: approval,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occured while Rejecting timesheet. Please try again."
      );
    }
  };


	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = timesheets.filter(
			(timesheet) =>
        timesheet.Project_Name.toLowerCase().includes(searchTerm) ||
        timesheet.Full_Name.toLowerCase().includes(searchTerm)

		);
		setFilteredTimesheets(filtered);
	};

  return (
    <>
				<input
					type="text"
					placeholder="Filter by employee name or project name...."
					className="filter_input w-1/3 px-4 py-[5px] border border-black focus:border-primary"
					value={filter}
					onChange={handleFilterChange}
				/>    <div className="timesheets-container mx-auto mt-12 grid grid-cols-3 gap-x-20 gap-y-8">
      {filteredTimesheets.map((timesheet, index) => (
        <div
          className="card__container h-fit bg-white border-2 border-primary rounded-xl p-4"
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
                className="text-secondary font-medium"
              >
                {expandedStates[index] ? "Show less" : "Show more"}
              </button>

              <div className="buttons flex items-center justify-evenly gap-x-8">
                <button
                  type="button"
                  className="bg-[#00ed64] text-white px-4 py-2 rounded-xl"
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
    </>
  );
};

export default Timesheets;
