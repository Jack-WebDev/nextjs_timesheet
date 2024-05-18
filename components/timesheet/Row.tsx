"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import projects from "@/database/projects.json";
import { Textarea } from "../ui/textarea";
import { getSession } from "@/actions";

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
    hours: [0, 0, 0, 0, 0],
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

    try {
      const res = await axios.post("http://localhost:3000/api/timesheets/", {
        formData: updatedFormData,
      });
      // localStorage.clear();
      toast.success("Timesheet has been submitted.");
    } catch (error) {
      toast.error(
        "An error occured while submitting your timesheet. Please reload the screen and try again.."
      );
    }
    toast.success("Timesheet has been submitted");

    setFormData({
      project: "",
      task_performed: "",
      hours: [0, 0, 0, 0, 0],
      total_hours: 0,
    });
  };

  return (
    <>
      <div className="row-form flex items-center justify-around my-4">
        <div className="grid gap-y-4">
          <select
            className="project_dropdown w-full"
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

          <input
            type="text"
            className="task_input border border-black mx-4 px-4"
            value={formData.task_performed}
            onChange={(e) => handleTaskChange(e.target.value)}
            placeholder="Task Performed..."
            required
          />
        </div>

        <div className="days">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((_day, index) => (
            <input
              key={index}
              className="hour_input w-1/6 mr-4"
              type="number"
              value={formData.hours[index]}
              onChange={(e) =>
                handleHoursChange(index, parseInt(e.target.value))
              }
              required
            />
          ))}
        </div>
        <div className="relative right-24">{calculateTotalHours()}</div>
      </div>
      <button
        type="submit"
        className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary py-2 px-6 mb-4 mr-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
};

export default Row;
