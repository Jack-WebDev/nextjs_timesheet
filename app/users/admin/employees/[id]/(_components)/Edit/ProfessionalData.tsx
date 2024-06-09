"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
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


  const handleSave = async (id:string) => {
    await axios.patch(`/api/users/${id}`, {
        EmployeeType: userData[0].EmployeeType,
        NDTEmail: userData[0].NDTEmail,
        departmentName: userData[0].departmentName,
        Role: userData[0].Role,
        Position: userData[0].Position,
        StartDate: userData[0].StartDate,
        OfficeLocation: userData[0].OfficeLocation,
    });

    window.location.reload();

  };

  return (
    <div>
      {userData?.map((user) => (
        <div key={user.id} className="grid gap-y-8">
        <div className="flex justify-between items-center">
          <div className="grid items-center gap-x-2 gap-y-2">
            <Label htmlFor="name">
              Employee Type:
            </Label>
            <input
              id="name"
              value={user.EmployeeType}
              className=" rounded-xl focus:border-primary border border-black pl-2 py-1"
              onChange={(e) =>
                setUserData((prevData) =>
                  prevData.map((u) =>
                    u.id === user.id ? { ...u, EmployeeType: e.target.value } : u
                  )
                )
              }
            />
          </div>
          <div className="grid items-center gap-x-2 gap-y-2">
            <Label htmlFor="name">
              Department Name:
            </Label>
            <input
              id="name"
              value={user.departmentName}
              className=" rounded-xl focus:border-primary border border-black pl-2 py-1"
              onChange={(e) =>
                setUserData((prevData) =>
                  prevData.map((u) =>
                    u.id === user.id ? { ...u, departmentName: e.target.value } : u
                  )
                )
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
        <div className="grid items-center gap-x-2 gap-y-2">
            <Label htmlFor="name">
              Position:
            </Label>
            <input
              id="name"
              value={user.Position}
              className=" rounded-xl focus:border-primary border border-black pl-2 py-1"
              onChange={(e) =>
                setUserData((prevData) =>
                  prevData.map((u) =>
                    u.id === user.id
                      ? { ...u, Position: e.target.value }
                      : u
                  )
                )
              }
            />
          </div>

          <div className="grid items-center gap-x-2 gap-y-2">
            <Label htmlFor="name">
              Role:
            </Label>
            <input
              id="name"
              value={user.Role}
              className=" rounded-xl focus:border-primary border border-black pl-2 py-1"
              onChange={(e) =>
                setUserData((prevData) =>
                  prevData.map((u) =>
                    u.id === user.id ? { ...u, Role: e.target.value } : u
                  )
                )
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
 

          <div className="grid items-center gap-x-2 gap-y-2">
            <Label htmlFor="name">
              Start Date:
            </Label>
            <input
              id="name"
              value={user.StartDate}
              className=" rounded-xl focus:border-primary border border-black pl-2 py-1"
              onChange={(e) =>
                setUserData((prevData) =>
                  prevData.map((u) =>
                    u.id === user.id ? { ...u, StartDate: e.target.value } : u
                  )
                )
              }
            />
          </div>

          <div className="grid items-center gap-x-2 gap-y-2">
            <Label htmlFor="name">
              Office Location:
            </Label>
            <input
              id="name"
              value={user.OfficeLocation}
              className=" rounded-xl focus:border-primary border border-black pl-2 py-1"
              onChange={(e) =>
                setUserData((prevData) =>
                  prevData.map((u) =>
                    u.id === user.id
                      ? { ...u, OfficeLocation: e.target.value }
                      : u
                  )
                )
              }
            />
          </div>
        </div>



        <Button className="w-full text-white rounded-xl" onClick={() => handleSave(user.id)}>
          Save
        </Button>
      </div>
      ))}
    </div>
  );
}
