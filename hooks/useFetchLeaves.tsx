"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/store";

type LeaveRequestProps = {
  id: string;
  fullName: string;
  reason: string;
  date: string;
  totalHours?: number;
  totalDays?: number;
  requestFor: string;
  email: string;
  phoneNumber: string;
  position: string;
  userId: string;
};

export default function useFetchDepartments() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestProps[]>([]);
  const user = useUser();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const res = await axios.get<LeaveRequestProps[]>("/api/leave");
      const leaveRequests = res.data;
      const filteredLeaveRequests = leaveRequests.filter(
        (leaveRequest) => leaveRequest.userId === user.id
      );
      setLeaveRequests(filteredLeaveRequests);
    };

    if (user && user.id) {
      fetchLeaveRequests();
    }
  }, [user]);

  return leaveRequests;
}
