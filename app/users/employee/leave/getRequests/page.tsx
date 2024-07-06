
import db from "@/database";


export default async function LeaveRequests() {
    const leaveRequests = await db.leaveRequest.findMany();
    const leaveRequestsCount = await db.leaveRequest.count();
  return (
    <div>page</div>
  )
}
