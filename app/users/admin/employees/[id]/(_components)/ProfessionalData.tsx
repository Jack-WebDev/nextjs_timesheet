"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  EmployeeType: string;
  NDTEmail: string;
  Password?: string;
  departmentName?: string;
  Role?: string;
  Position?: string;
  StartDate: string;
  OfficeLocation: string;
};

export default function ProfessionalData() {
  const params = useParams();
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [params.id]);
  return (
    <div>
      {userData?.map((user) => (
        <div key={user.id}>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between items-center">
              <div className="grid items-center gap-4">
                <label htmlFor="name">Employee Type:</label>
                <input className="pointer-events-none"  value={user.EmployeeType} readOnly />
              </div>
              <div className="grid items-center gap-4">
                <label htmlFor="name">NDT Division:</label>
                <input className="pointer-events-none"  value={user.departmentName} readOnly />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="grid items-center gap-4">
                <label htmlFor="name">Role:</label>
                <input className="pointer-events-none"  value={user.Role} readOnly />
              </div>
              <div className="grid items-center gap-4">
                <label htmlFor="name">Position:</label>
                <input className="pointer-events-none"  value={user.Position} readOnly />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="grid  items-center gap-4">
                <label htmlFor="name">Start Date:</label>
                <input className="pointer-events-none"  value={user.StartDate} readOnly />
              </div>
              <div className="grid  items-center gap-4">
                <label htmlFor="name">Office Location:</label>
                <input className="pointer-events-none"  value={user.OfficeLocation} readOnly />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
