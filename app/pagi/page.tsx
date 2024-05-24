// "use client";

// import * as React from "react";
// import { CalendarIcon } from "@radix-ui/react-icons";
// import { addDays, format } from "date-fns";
// import { DateRange } from "react-day-picker";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { useState } from "react";
// import axios from "axios";

// type Task = {
//   taskPerformed: string;
//   taskStatus: string;
// };

// type TableRow = {
//   weekday: string;
//   totalHours: number;
//   tasks: Task[];
//   comment: string;
// };

// type FormDetails = {
//   month: string;
//   name: string;
//   role: string;
//   projectManager: string;
//   projectName: string;
// };

// const initialData: TableRow[] = [
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
//   {
//     weekday: new Date().toISOString().split("T")[0],
//     totalHours: 0,
//     tasks: [],
//     comment: "",
//   },
// ];
// export default function TableForm() {
//   const [tableData, setTableData] = useState<TableRow[]>(initialData);
//   const [formDetails, setFormDetails] = useState<FormDetails>({
//     month: "",
//     name: "",
//     role: "",
//     projectManager: "",
//     projectName: "",
//   });

//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(2022, 0, 20),
//     to: addDays(new Date(2022, 0, 20), 20),
//   });

//   const f = `${date?.from?.toLocaleDateString()} to ${date?.to?.toLocaleDateString()}`;

//   const handleAddTask = (index: number) => {
//     setTableData((prevData) => {
//       const newData = [...prevData];
//       newData[index].tasks.push({ taskPerformed: "", taskStatus: "" });
//       return newData;
//     });
//   };

//   const handleChange = (
//     rowIndex: number,
//     taskIndex: number,
//     field: keyof Task,
//     value: string
//   ) => {
//     setTableData((prevData) => {
//       const newData = [...prevData];
//       newData[rowIndex].tasks[taskIndex] = {
//         ...newData[rowIndex].tasks[taskIndex],
//         [field]: value,
//       };
//       return newData;
//     });
//   };

//   const handleFormChange = (field: keyof FormDetails, value: string) => {
//     setFormDetails((prevDetails) => ({
//       ...prevDetails,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const formData = {
//       combinedData: {
//         ...formDetails,
//         weeklyPeriod: f,
//         timesheet: tableData,
//         userID: "134c92d4-bc2a-45b6-b621-c53d47f01300",
//       },
//     };

//     const res = await axios.post<TableRow, FormDetails>("/api/pagAp", {
//       formData: formData,
//     });

//     console.log(res);
//   };
//   return (
//     <div>
//       <form>
//         <label>
//           Month:
//           <input
//             type="text"
//             value={formDetails.month}
//             onChange={(e) => handleFormChange("month", e.target.value)}
//           />
//         </label>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={formDetails.name}
//             onChange={(e) => handleFormChange("name", e.target.value)}
//           />
//         </label>
//         <label>
//           Role:
//           <input
//             type="text"
//             value={formDetails.role}
//             onChange={(e) => handleFormChange("role", e.target.value)}
//           />
//         </label>
//         <label>
//           Project Manager:
//           <input
//             type="text"
//             value={formDetails.projectManager}
//             onChange={(e) => handleFormChange("projectManager", e.target.value)}
//           />
//         </label>
//         <label>
//           Project Name:
//           <input
//             type="text"
//             value={formDetails.projectName}
//             onChange={(e) => handleFormChange("projectName", e.target.value)}
//           />
//         </label>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               id="date"
//               variant={"outline"}
//               className={cn(
//                 "w-[300px] justify-start text-left font-normal",
//                 !date && "text-muted-foreground"
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {date?.from ? (
//                 date.to ? (
//                   <>
//                     {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
//                   </>
//                 ) : (
//                   format(date.from, "LLL dd")
//                 )
//               ) : (
//                 <span>Pick a date</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               initialFocus
//               mode="range"
//               defaultMonth={date?.from}
//               selected={date}
//               onSelect={setDate}
//               numberOfMonths={1}
//             />
//           </PopoverContent>
//         </Popover>
//       </form>
//       <table>
//         <thead>
//           <tr>
//             <th>Weekday</th>
//             <th>
//               Public/Normal Day{" "}
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild className="rounded-full">
//                     <Button variant="outline">?</Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Add to library</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </th>
//             <th>Total Hours</th>
//             <th>Tasks Performed</th>
//             <th>Comment</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td>
//                 <input
//                   type="date"
//                   value={row.weekday}
//                   onChange={(e) =>
//                     setTableData((prevData) => {
//                       const newData = [...prevData];
//                       newData[rowIndex].weekday = e.target.value;
//                       return newData;
//                     })
//                   }
//                 />
//               </td>
//               <td>
//                 <select name="" id="">
//                   <option value="">Select type of day</option>
//                   <option value="publicDay">Public Holiday</option>
//                   <option value="normalDay">Work/Normal Day</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={row.totalHours}
//                   onChange={(e) =>
//                     setTableData((prevData) => {
//                       const newData = [...prevData];
//                       newData[rowIndex].totalHours = parseInt(e.target.value);
//                       return newData;
//                     })
//                   }
//                 />
//               </td>
//               <td>
//                 {row.tasks.map((task, taskIndex) => (
//                   <div key={taskIndex}>
//                     <input
//                       type="text"
//                       value={task.taskPerformed}
//                       onChange={(e) =>
//                         handleChange(
//                           rowIndex,
//                           taskIndex,
//                           "taskPerformed",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <select
//                       value={task.taskStatus}
//                       onChange={(e) =>
//                         handleChange(
//                           rowIndex,
//                           taskIndex,
//                           "taskStatus",
//                           e.target.value
//                         )
//                       }
//                     >
//                       <option value="">Select status</option>
//                       <option value="Pending">Pending</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 ))}
//                 <button onClick={() => handleAddTask(rowIndex)}>
//                   Add Task
//                 </button>
//               </td>
//               <td>
//                 <textarea
//                   value={row.comment}
//                   onChange={(e) =>
//                     setTableData((prevData) => {
//                       const newData = [...prevData];
//                       newData[rowIndex].comment = e.target.value;
//                       return newData;
//                     })
//                   }
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }
