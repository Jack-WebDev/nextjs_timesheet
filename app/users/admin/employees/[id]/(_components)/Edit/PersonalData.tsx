"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import db from "@/database";
import { revalidatePath } from "next/cache";

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
  const userID = params.id;
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`/api/users/${userID}`);
      const usersData = await res.data;
      setUserData(usersData);
    };
  
    fetchUserData();
  }, [userID]);



  const handleSave = async (id:string) => {
    await axios.patch(`/api/users/${id}`, {
      Name: userData[0].Name,
      Surname: userData[0].Surname,
      Email: userData[0].Email,
      IdNumber: userData[0].IdNumber,
      MobileNumber: userData[0].MobileNumber,
      Address: userData[0].Address,
      City: userData[0].City,
      ZipCode: userData[0].ZipCode,
      Province: userData[0].Province,
      DateOfBirth: userData[0].DateOfBirth,
      MaritalStatus: userData[0].MaritalStatus,
      Gender: userData[0].Gender,
      Nationality: userData[0].Nationality,
    });

    window.location.reload();

  };

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
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, Name: e.target.value } : u
                    )
                  )
                }
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
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, Surname: e.target.value } : u
                    )
                  )
                }
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
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, Email: e.target.value } : u
                    )
                  )
                }
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                ID Number:
              </Label>
              <input
                id="name"
                value={user.IdNumber}
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, IdNumber: e.target.value } : u
                    )
                  )
                }
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
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id
                        ? { ...u, MobileNumber: e.target.value }
                        : u
                    )
                  )
                }
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Address:
              </Label>
              <input
                id="name"
                value={user.Address}
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, Address: e.target.value } : u
                    )
                  )
                }
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
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id
                        ? { ...u, MaritalStatus: e.target.value }
                        : u
                    )
                  )
                }
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Nationality:
              </Label>
              <input
                id="name"
                value={user.Nationality}
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id
                        ? { ...u, Nationality: e.target.value }
                        : u
                    )
                  )
                }
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
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, Gender: e.target.value } : u
                    )
                  )
                }
              />
            </div>
            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Date of Birth:
              </Label>
              <input
                id="name"
                value={user.DateOfBirth}
                className=" rounded-xl focus:border-primary"
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
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, Province: e.target.value } : u
                    )
                  )
                }
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                City:
              </Label>
              <input
                id="name"
                value={user.City}
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, City: e.target.value } : u
                    )
                  )
                }
              />
            </div>

            <div className="grid items-center gap-x-2">
              <Label htmlFor="name" className="text-right">
                Zip Code:
              </Label>
              <input
                id="name"
                value={user.ZipCode}
                className=" rounded-xl focus:border-primary"
                onChange={(e) =>
                  setUserData((prevData) =>
                    prevData.map((u) =>
                      u.id === user.id ? { ...u, ZipCode: e.target.value } : u
                    )
                  )
                }
              />
            </div>
          </div>
          <Button className="w-full" onClick={() => handleSave(user.id)}>
            Save
          </Button>
        </div>
      ))}
    </div>
  );
}
