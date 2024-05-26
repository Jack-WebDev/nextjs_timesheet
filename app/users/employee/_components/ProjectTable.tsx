"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getSession } from "@/actions";
import { FaEye } from "react-icons/fa";
import { ViewProject } from "@/components/dialogUI/ViewProject";
import { useUser } from "@/app/store";


type Project = {
  id: string;
  Project_Name: string;
  Description: string;
  AssignedUsers: any[];
  Email: string;
};

const ProjectTable: React.FC = () => {
  const [cleaned, setCleaned] = useState<Project[]>([]);
  const [filteredprojects, setFilteredprojects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("");
  const email = useUser()

  const fetchprojects = useCallback(async() => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3000/api/projects"
      );

      const projects = response.data;

      const userProjects = projects.filter((project) =>
        project.AssignedUsers.some(
          (assignedUser) => assignedUser.user.Email === email.Email
        )
      );

      setCleaned(userProjects);

      setFilteredprojects(userProjects);
    } catch (error) {
      console.log(error);
    }  }, [email.Email]); 

  useEffect(() => {
    fetchprojects();
  }, [fetchprojects]); 



  const truncateText = (text: string, wordLimit: number) => {
    if (!text) return "No Description";

    const words = text.split(" ");

    if (words.length > 1) {
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(" ") + ".....";
    }

    if (text.length <= 15) {
      return text;
    }
    return text.slice(0, 15) + ".....";
  };


  console.log(cleaned)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilter(searchTerm);
    const filtered = cleaned.filter((clean) =>
      clean.Project_Name.toLowerCase().includes(searchTerm)
    );
    setFilteredprojects(filtered);
  };

  return (
    <div className="w-[60%] mx-auto mt-12 bg-white border-2 border-primary p-8 rounded-2xl ">
      <div className="flex items-center justify-between mb-12">
        <input
          type="text"
          placeholder="Filter by project name..."
          className="filter_input w-1/2 px-8 py-[5px] border border-black focus:border-primary"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <table className="w-full">
        <thead className="relative -top-4">
          <tr className="text-left text-gray-500">
            <th className=" font-normal">Project Name</th>
            <th className=" font-normal">Project Description</th>
            <th className=" font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredprojects.map((project) => (
            <tr key={project.id}>
              <td>{truncateText(project.Project_Name,3)}</td>
              <td>{truncateText(project.Description, 5)}</td>

              <td className="flex items-center justify-center gap-4">
                <ViewProject id={project.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
