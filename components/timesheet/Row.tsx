"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { getSession } from "@/actions";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface RowFormData {
  project: string;
  task_performed: string;
  hours: number[];
  total_hours: number;
}

type Project = {
  id: string;
  Project_Name: string;
  AssignedUsers: any[];
  Email: string;
};

const Row: React.FC = () => {
  const [formData, setFormData] = useState<RowFormData>({
    project: "",
    task_performed: "",
    hours: [0, 0, 0, 0, 0, 0, 0],
    total_hours: 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchprojects();
  }, []);

  const fetchprojects = async () => {
    const data = await getSession();

    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3000/api/projects"
      );
      const projects = response.data;

      const userProjects = projects.filter((project) =>
        project.AssignedUsers.some(
          (assignedUser) => assignedUser.user.Email === data.Email
        )
      );

      setProjects(userProjects);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalHours = (): number => {
    return formData.hours.reduce((total, hour) => total + hour, 0);
  };

  const handleTaskChange = (value: string) => {
    setFormData({ ...formData, task_performed: value });
  };

  const handleHoursChange = (index: number, value: number) => {
    if (value < 0) {
      value = 0;
    }

    const newHours = [...formData.hours];
    newHours[index] = value;
    setFormData({ ...formData, hours: newHours });
  };

  const handleSubmit = async () => {
    const totalHours = calculateTotalHours();
    const date = localStorage.getItem("week");
    const fullName = localStorage.getItem("user");

    const updatedFormData = {
      fullName: fullName,
      period: date,
      ...formData,
      hours: [...formData.hours],
      total_hours: totalHours,
    };

    if (!fullName || !date || !formData.project || !formData.task_performed) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    if (totalHours <= 0) {
      toast.error("Total hours cannot be 0.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/timesheets/", {
        formData: updatedFormData,
      });
      // localStorage.clear();
    } catch (error) {
      toast.error(
        "An error occured while submitting your timesheet. Please reload the screen and try again.."
      );
    }
    toast.success("Timesheet has been submitted");

    setFormData({
      project: "",
      task_performed: "",
      hours: [0, 0, 0, 0, 0, 0, 0],
      total_hours: 0,
    });
  };

  return (
    <>
      <div className="row-form flex items-center justify-around my-4 border-t border-gray-300 pt-4">
        <div className="grid gap-y-4 w-[20%]">
          <select
            className="w-full"
            value={formData.project}
            onChange={(e) =>
              setFormData({ ...formData, project: e.target.value })
            }
          >
            <option value="">Select Project</option>
            {projects.map((project, index) => (
              <option key={index} value={project.Project_Name}>
                {project.Project_Name}
              </option>
            ))}
          </select>

          <Textarea
            className="px-4 rounded-xl p-2 focus:border-2 focus:border-primary"
            value={formData.task_performed}
            onChange={(e) => handleTaskChange(e.target.value)}
            placeholder="Task Performed..."
            required
          />
        </div>

        <div className="days flex justify-around">
          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[0]}
            onChange={(e) => handleHoursChange(0, parseInt(e.target.value))}
            type="number"
            required
          />
          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[1]}
            onChange={(e) => handleHoursChange(1, parseInt(e.target.value))}
            type="number"
          />
          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[2]}
            onChange={(e) => handleHoursChange(2, parseInt(e.target.value))}
            type="number"
          />
          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[3]}
            onChange={(e) => handleHoursChange(3, parseInt(e.target.value))}
            type="number"
          />
          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[4]}
            onChange={(e) => handleHoursChange(4, parseInt(e.target.value))}
            type="number"
          />
          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[5]}
            onChange={(e) => handleHoursChange(5, parseInt(e.target.value))}
            type="number"
          />

          <Input
            className="w-[7%] shadow-none focus:border-2 focus:border-primary rounded-xl"
            value={formData.hours[6]}
            onChange={(e) => handleHoursChange(6, parseInt(e.target.value))}
            type="number"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4 mb-4">
        <div className="font-semibold">Total Hours:</div>
        <div className="text-primary font-semibold">
          {calculateTotalHours()}
        </div>
      </div>


      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary py-2 px-6 mb-4 mr-4">Submit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit your timesheet for approval</DialogTitle>
            <DialogDescription>
              Click submit if the data is accurate
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name:
              </Label>
              <p>{localStorage.getItem("user")}</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Week:
              </Label>
              <p>{localStorage.getItem("week")}</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Project Name:
              </Label>
              <p>{formData.project}</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task Performed:
              </Label>
              <p>{formData.task_performed}</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Total Hours:
              </Label>
              <p>{calculateTotalHours()}</p>
            </div>

            <div className="grid grid-cols-2 justify-items-center items-center gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <div key={index} className="flex items-center gap-2">
                  <Label htmlFor="name" key={index} className="text-right">
                    {day}:
                  </Label>
                  <p key={index}>{formData.hours[index]} hrs</p>
                  </div>
                )
              )}

              {/* <p>{formData.hours}</p> */}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary py-2 px-6 mb-4 mr-4"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Row;
