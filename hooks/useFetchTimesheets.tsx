import { useEffect, useState } from "react";
import axios from "axios";
import { TimesheetProps } from "@/types/timesheetProps";

export default function useFetchTimesheets() {
  const [timesheets, setTimesheets] = useState<TimesheetProps[]>([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      const res = await axios.get<TimesheetProps[]>("http://localhost:3000/api/timesheets/");
      const timesheets = res.data;
      setTimesheets(timesheets);
    };

    fetchTimesheets();
  }, []);

  return timesheets;
}
