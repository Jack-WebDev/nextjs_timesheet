import { useEffect, useState } from "react";
import axios from "axios";
import { ProjectProps } from "../types/projectProps";

export default function useFetchProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get<ProjectProps[]>("http://localhost:3000/api/projects/");
      const projects = res.data;
      setProjects(projects);
    };

    fetchProjects();
  }, []);

  return projects ;
}
