import React, { useState } from 'react';
import axios from 'axios';

// Define the Project type
type Project = {
  id: string;
  Project_Name: string;
  Project_Manager: string;
  Client_Name: string;
  Description: string;
};

// Sample data
const projects: Project[] = [
  { id: '1', Project_Name: 'Project A', Project_Manager: 'Manager A', Client_Name: 'Client A', Description: 'Description A' },
  { id: '2', Project_Name: 'Project B', Project_Manager: 'Manager B', Client_Name: 'Client B', Description: 'Description B' },
  { id: '3', Project_Name: 'Project C', Project_Manager: 'Manager C', Client_Name: 'Client C', Description: 'Description C' },
];

// Define the FormDetails type
type FormDetails = {
  month: string;
  name: string;
  role: string;
  projectManager: string;
  projectName: string;
};

// Component props (if needed)
type Props = {
  fullName: string;
};

const ProjectManagerDropdown: React.FC<Props> = ({ fullName }) => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    month: '',
    name: fullName,
    role: '',
    projectManager: '',
    projectName: '',
  });

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectId = event.target.value;

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProject) {
      setFormDetails({
        ...formDetails,
        projectName: selectedProject.Project_Name,
        projectManager: selectedProject.Project_Manager,
      });
    } else {
      setFormDetails({
        ...formDetails,
        projectName: '',
        projectManager: '',
      });
    }
  };

  const handleSubmit = async () => {
    const formData = {
      combinedData: {
        ...formDetails,
      },
    };

    try {
      const res = await axios.post('http://localhost:3000/api/timesheets', formData);
      console.log(res.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="projectDropdown">Select Project:</label>
        <select id="projectDropdown" value={formDetails.projectName} onChange={handleProjectChange}>
          <option value="">--Select a Project--</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.Project_Name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="projectManager">Project Manager:</label>
        <input id="projectManager" type="text" value={formDetails.projectManager} readOnly />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProjectManagerDropdown;
