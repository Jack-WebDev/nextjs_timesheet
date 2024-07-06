"use server";
import db from "@/database/index";

type LeaveRequestProps = {
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

export const createLeaveRequest = async (data: LeaveRequestProps) => {
  try {
    const res = await db.leaveRequest.create({
      data: {
        fullName: data.fullName,
        reason: data.reason,
        date: data.date,
        totalHours: data.totalHours,
        totalDays: data.totalDays,
        requestFor: data.requestFor,
        email: data.email,
        phoneNumber: data.phoneNumber,
        position: data.position,
        userId: data.userId,
      },
    });

    console.log(res);
  } catch (error) {
    console.error("Error creating a leave request:", error);
    throw error;
  }
};
