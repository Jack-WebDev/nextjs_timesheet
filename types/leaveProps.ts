export type LeaveRequestProps = {
  fullName: string;
  reason: string;
  date: string;
  totalHours?: number;
  totalDays?: number;
  requestFor: string;
  leaveType: string;
  email: string;
  phoneNumber: string;
  position: string;
  userId: string;
};
