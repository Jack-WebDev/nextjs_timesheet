"use client";

import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  Name: string;
  Surname: string;
  Email: string;
  IdNumber: string;
  MobileNumber: string;
  Address: string;
  City: string;
  ZipCode: string;
  Province: string;
  DateOfBirth: string;
  MaritalStatus: string;
  Gender: string;
  Nationality: string;
};

export default function PersonalData() {
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
        <div key={user.id} className="grid gap-y-8">
          <div className="flex justify-between items-center">
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                First Name:
              </Label>
              <input
                id="name"
                value={user.Name}
                className=" rounded-xl focus:border-primary"
                readOnly
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Last Name:
              </Label>
              <input
                id="name"
                value={user.Surname}
                className=" rounded-xl focus:border-primary"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Email:
              </Label>
              <input
                id="name"
                value={user.Email}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                ID Number:
              </Label>
              <input
                id="name"
                value={user.IdNumber}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Mobile Number:
              </Label>
              <input
                id="name"
                value={user.MobileNumber}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Address:
              </Label>
              <input
                id="name"
                value={user.Address}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Marital Status:
              </Label>
              <input
                id="name"
                value={user.MaritalStatus}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Nationality:
              </Label>
              <input
                id="name"
                value={user.Nationality}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Gender:
              </Label>
              <input
                id="name"
                value={user.Gender}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Date of Birth:
              </Label>
              <input
                id="name"
                value={user.DateOfBirth}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Province:
              </Label>
              <input
                id="name"
                value={user.Province}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                City:
              </Label>
              <input
                id="name"
                value={user.City}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Zip Code:
              </Label>
              <input
                id="name"
                value={user.ZipCode}
                className=" rounded-xl focus:border-primary pointer-events-none"
                readOnly
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
