"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditProject } from "../dialogUI/EditProject";
import { AddProject } from "../dialogUI/AddProject";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

type Project = {
  id: string;
  Project_Name: string;
  Description: string;
  Department_Name: string;
};

const ProjectTable: React.FC = () => {
  const [projects, setprojects] = useState<Project[]>([]);
  const [filteredprojects, setFilteredprojects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetchprojects();
  }, []);

  const truncateText = (text:string, wordLimit:number) => {
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
  

  const fetchprojects = async () => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3000/api/projects"
      );
      console.log(response.data);
      setprojects(response.data);
      setFilteredprojects(response.data);
    } catch (error) {
      toast.error(
        "An error occured while fetching projects. Please reload the screen and try again."
      );
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`);
      fetchprojects();
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(
        "An error occured while deleting project. Please reload and try again."
      );
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilter(searchTerm);
    const filtered = projects.filter((project) =>
      project.Project_Name.toLowerCase().includes(searchTerm)
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
        <AddProject />
      </div>
      <table className="w-full">
        <thead className="relative -top-4">
          <tr className="text-left text-gray-500">
            <th className=" font-normal">Project Name</th>

            <th className=" font-normal">Project Description</th>
            <th className=" font-normal">Department</th>

            <th className=" font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredprojects.map((project) => (
            <tr key={project.id}>
              <td>{project.Project_Name}</td>
              <td>{truncateText(project.Description, 5)}</td>

              <td>{project.Department_Name}</td>

              <td className="flex items-center justify-center gap-4">
                <EditProject id={project.id} />
                <FaTrashAlt
                  className="cursor-pointer"
                  onClick={() => handleDelete(project.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
