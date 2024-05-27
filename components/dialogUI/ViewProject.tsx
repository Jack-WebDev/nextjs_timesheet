"use client";

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
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaEye } from "react-icons/fa";

type Department = {
  id: string;
  Department_Name: string;
};

type Project = {
  id: string;
  Project_Name: string;
  Project_Manager: string;
  Client_Name: string;
  Description: string;
  department: Department;
  assignedMembers: string[];
};

type User = {
	id: string;
};

export function ViewProject({id}:any ) {
  const [projects, setProjects] = useState<Project[]>([]);

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  // const fetchProjects = async () => {
  //   const response = await axios.get<Project[]>(
  //     `http://localhost:3000/api/projects/${id}`
  //   );
  //   setProjects(response.data);
  // };

  const fetchProjects = useCallback(async () => {
    const response = await axios.get<Project[]>(
      `http://localhost:3000/api/projects/${id}`
    );
    setProjects(response.data);
  }, [id]); // Add `id` as a dependency since it's used inside `fetchProjects`

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]); // Add `fetchProjects` to the dependency array


  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaEye className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-[25%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Project Details</DialogTitle>
        </DialogHeader>
        {projects?.map((project) => (
          <div key={project.id} className="grid gap-4 py-4">
                    <div className="flex  items-center gap-4 mb-4">
                      <Label htmlFor="projectName" className="text-[1.3rem]">
                        Project Name:
                      </Label>
                      <p className="text-[1.1rem]">{project.Project_Name}</p>
                    </div>
                    <div className="flex  items-center gap-4 mb-4">
                      <Label htmlFor="projectName" className="text-[1.3rem]">
                        Project Manager:
                      </Label>
                      <p className="text-[1.1rem]">{project.Project_Manager}</p>
                    </div>
                    <div className="flex  items-center gap-4 mb-4">
                      <Label htmlFor="projectName" className="text-[1.3rem]">
                        Client Name:
                      </Label>
                      <p className="text-[1.1rem]">{project.Client_Name}</p>
                    </div>
                    <div className="flex  items-center gap-4 mb-4">
                      <Label htmlFor="projectName" className="text-[1.3rem]">
                        Project Description:
                      </Label>
                      <p className="text-[1.1rem]">{project.Description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Label htmlFor="projectName" className="text-[1.3rem]">
                        Project Team:
                      </Label>
                      <p className="flex">
                        {project.assignedMembers.map((member, index) => (
                          <div key={index} className="flex">
                            <span className="text-[1.1rem]">
                              {index !== 0 && ", "}
                              {member}
                            </span>
                          </div>
                        ))}
                      </p>
                    </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
