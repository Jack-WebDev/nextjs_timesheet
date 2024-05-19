"use client";

import React, { useState } from "react";
import RowForm from "./Row";

interface RowData {
  hours: number[];
}

const ProjectCard: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([{ hours: [0, 0, 0, 0, 0, 0, 0] }]);

  const addRow = () => {
    setRows([...rows, { hours: [0, 0, 0, 0, 0, 0,0] }]);
  };

  return (
    <div className="project-card mt-12 border-2 border-primary m-auto p-4 rounded-xl bg-white">
      <div className="flex items-center justify-around">
        <div className="font-semibold">Project/Task</div>
        {/* <div>Task</div> */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div className="font-semibold" key={index}>{day}</div>
        ))}
        {/* <div>Total Hours</div> */}
      </div>
      {rows.map((_row, index) => (
        <RowForm key={index} />
      ))}

      <button
        onClick={addRow}
        className="bg-secondary text-white py-2 px-6 mt-8 rounded-xl"
      >
        Add Row
      </button>
    </div>
  );
};

export default ProjectCard;
