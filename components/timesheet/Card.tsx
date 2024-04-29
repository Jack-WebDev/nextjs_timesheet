"use client";

import React, { useState } from "react";
import RowForm from "./Row";

interface RowData {
	hours: number[];
}

const ProjectCard: React.FC = () => {
	const [rows, setRows] = useState<RowData[]>([{ hours: [0, 0, 0, 0, 0] }]);

	const addRow = () => {
		setRows([...rows, { hours: [0, 0, 0, 0, 0] }]);
	};

	return (
		<div className="project-card mt-12 border-2 border-primary m-auto p-4 rounded-xl">
			<div className="flex items-center justify-around">
				<div>Project</div>
				<div>Task</div>
				{["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
					<div key={index}>{day}</div>
				))}
				<div>Total Hours</div>
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
