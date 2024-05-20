"use client";

import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useEffect, useState } from "react";
import Card from "@/components/timesheet/Card";
import { format } from "date-fns";
import axios from "axios";
import { getSession } from "@/actions";

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
  const [filteredTimesheets, setFilteredTimesheets] = useState<Timesheet[]>([]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("user");
    }
    fetchTimesheets()
  }, []);

  const fetchTimesheets = async () => {
    const sessionData = await getSession()
    

    try {
      const response = await axios.get<Timesheet[]>("http://localhost:3000/api/timesheets");

      const timesheets = response.data;

      const userTimesheets = timesheets.filter((timesheet) =>
        timesheet.Full_Name === sessionData.Name
      );
        
      setFilteredTimesheets(userTimesheets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        <h2 className="text-center text-3xl text-secondary">Your Timesheets</h2>

        <div className="timesheets-container mx-auto grid grid-cols-3 gap-x-20 gap-y-8">
          {filteredTimesheets.map((timesheet) => (
            <div
              className="card__container h-fit bg-white border-2 border-primary rounded-xl p-4"
              key={timesheet.id}
            >
              <>
                <div className="card__head grid gap-4">
                  <h1 className="font-bold">
                    Full Name: {timesheet.Full_Name}
                  </h1>
                  <h2>Project Name: {timesheet.Project_Name}</h2>
                </div>
                <div className="card__body grid gap-4">
                  <div>
                    <h2>Task Performed: {timesheet.Task_performed}</h2>
                    <h3 className="font-bold">
                      Calendar Week: {timesheet.Week}
                    </h3>
                  </div>

                  {
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
                  }
                </div>
              </>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Timesheet;
