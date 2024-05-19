"use client";

import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useEffect, useState } from "react";
import Card from "@/components/timesheet/Card";
import { format } from "date-fns";

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
