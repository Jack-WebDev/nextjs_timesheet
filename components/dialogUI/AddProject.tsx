"use client";
//TODO: Tags of selected users

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

type Department = {
  id: string;
  Department_Name: string;
  users: [];
};

type Project = {
  Project_Name: string;
  Department_Id: string;
  departmentName: string;
  user_id: string;
  Project_Description: string;
  
};

type User = {
  id: string;
  Email: string;
};

export function AddProject() {
  const [Project_Name, setProject_Name] = useState("");
  const [Project_Description, setProject_Description] = useState("")
  const [department_id, setDepartment_id] = useState("");
  const [user_id, setUser_id] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[][]>([]);
  const router = useRouter()

  useEffect(() => {
    fetchdepartments();
  }, []);

  const fetchdepartments = async () => {
    try {
      const response = await axios.get<Department[]>(
        "http://localhost:3000/api/departments/"
      );
      setDepartments(response.data);
    } catch (error) {
      toast.error(
        "An error occured while fetching departments. Please reload the screen and try again."
      );
    }
  };

  const handleDepartmentChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const departmentId = event.target.value as string;
    setSelectedDepartment(departmentId);
    const department = departments.find((dept) => dept.id === departmentId);
    if (department) {
      const userDetailsPromises = department.users.map(async ({ id }) => {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          return await response.json();
        } else {
          console.error(`Failed to fetch user with ID ${id}`);
          return null;
        }
      });

      const userDetails = await Promise.all(userDetailsPromises);
      const filteredUserDetails = userDetails.filter(
        (userDetail) => userDetail !== null
      );

      setUsers(filteredUserDetails);
    }
  };

  const handleSave = async () => {
    await axios.post<Project>(`http://localhost:3000/api/projects/`, {
      Project_Name: Project_Name,
      Description: Project_Description,
      Department_Id: selectedDepartment,
      user_id: user_id,
    });

    window.location.reload()
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary">
          <FaPlusCircle />
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              value={Project_Name}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setProject_Name(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Description
            </Label>
            <Textarea
              id="description"
              value={Project_Description}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setProject_Description(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Department Name
            </Label>
            <select
              name="department"
              className="focus:border-primary"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value={""}>Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.Department_Name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Add Employee
            </Label>
            <select
              name="user"
              className="focus:border-primary"
              value={user_id}
              onChange={(e) => setUser_id(e.target.value)}
            >
              <option value={""}>Select Employee</option>
              {users.map((user, index) => (
                <optgroup key={index}>
                  {user.map((j, i) => (
                    <option key={i} value={j.id}>
                      {j.Email}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-primary text-white rounded-xl hover:bg-primary"
            onClick={handleSave}
          >
            Add Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
