"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@/app/store";
import { toast } from "react-toastify";

type AddTask = {
  taskPerformed: string;
  taskStatus: string;
};

type TableRow = {
  weekday: string;
  totalHours: number;
  tasks: AddTask[];
  comment: string;
};

type FormDetails = {
  month: string;
  name: string;
  role: string;
  projectManager: string;
  projectName: string;
};

const initialData: TableRow[] = [
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    totalHours: 0,
    tasks: [],
    comment: "",
  },
];

type Task = {
  id: string;
  taskPerformed: string;
  taskStatus: string;
  tableRowId: string;
};

type TableRows = {
  id: string;
  totalHours: number;
  comment: string;
  tasks: Task[];
  weekday: string;
  userId: string;
};

type Timesheet = {
  id: string;
  month: string;
  name: string;
  role: string;
  projectManager: string;
  projectName: string;
  weeklyPeriod: string;
  tableRows: TableRows[];
  Approval_Status: string;
};

type Project = {
  id: string;
  Project_Name: string;
  Project_Manager: string;
  Client_Name: string;
  Description: string;
};

export default function Timesheet() {
  const [tableData, setTableData] = useState<TableRow[]>(initialData);
  const [data, setFilteredTimesheets] = useState<Timesheet[]>([]);
  const [projects, setprojects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [projectManager, setProjectManager] = useState<string>("");
  const userZ = useUser();
  const fullName = `${userZ.Name} ${userZ.Surname}`;

  const [formDetails, setFormDetails] = useState<FormDetails>({
    month: "",
    name: fullName,
    role: "",
    projectManager: "",
    projectName: "",
  });

  console.log(data);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Timesheet>[] = [
    {
      accessorKey: "Approval_Status",
      header: "Approval Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Approval_Status")}</div>
      ),
    },
    {
      accessorKey: "projectName",
      header: "Project Name",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("projectName")}</div>
      ),
    },
    {
      accessorKey: "projectManager",
      header: "Project Manager",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("projectManager")}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-start">Actions</div>,
      cell: ({ row }) => {
        const timesheet = row.original;
        const statusClass =
          timesheet.Approval_Status === "Pending"
            ? "text-yellow-500 font-semibold"
            : timesheet.Approval_Status.includes("Rejected")
            ? "text-red-500 font-semibold"
            : timesheet.Approval_Status.includes("Approved")
            ? "text-green-700 font-semibold"
            : "";
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <span className="cursor-pointer">
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </span>
                </DialogTrigger>
                <DialogContent className="w-1/2">
                  <DialogHeader className="flex flex-row items-baseline justify-around">
                    <DialogTitle>Timesheet Details</DialogTitle>
                    <div className="text-xl">
                      Approval Status:{" "}
                      <span className={statusClass}>
                        {timesheet.Approval_Status}
                      </span>{" "}
                    </div>
                  </DialogHeader>
                  <div>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Weekday</th>
                          <th>Total Hours</th>
                          <th>Tasks Performed</th>
                          <th>Task Status</th>
                          <th>Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timesheet &&
                          timesheet.tableRows &&
                          timesheet.tableRows?.map((r) => (
                            <tr
                              key={r.id}
                              className="border-b border-secondary"
                            >
                              <td className="text-center">
                                <p>{r.weekday}</p>
                              </td>
                              <td className="text-center">
                                <p>{r.totalHours}</p>
                              </td>
                              <td className="text-center">
                                {r.tasks && r.tasks.length > 0 ? (
                                  r.tasks.map((t) => (
                                    <div key={t.id}>
                                      <p>
                                        {t.taskPerformed === ""
                                          ? "N/A"
                                          : t.taskPerformed}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <p>N/A</p>
                                )}
                              </td>

                              <td className="text-center">
                                {r.tasks && r.tasks.length > 0 ? (
                                  r.tasks.map((t) => (
                                    <div key={t.id}>
                                      <p>{t.taskStatus}</p>
                                    </div>
                                  ))
                                ) : (
                                  <span>N/A</span>
                                )}
                              </td>
                              <td className="text-center">
                                <p>{r.comment === "" ? "N/A" : r.comment}</p>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuTrigger>
          </DropdownMenu>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const f = `${date?.from?.toISOString().split("T")[0]} to ${
    date?.to?.toISOString().split("T")[0]
  }`;
  console.log(f);

  const handleAddTask = (index: number) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].tasks.push({ taskPerformed: "", taskStatus: "" });
      return newData;
    });
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);

    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    if (selectedProject) {
      setFormDetails({
        ...formDetails,
        projectName: selectedProject.Project_Name,
        projectManager: selectedProject.Project_Manager,
      });
    } else {
      setFormDetails({
        ...formDetails,
        projectName: "",
        projectManager: "",
      });
    }
  };

  const handleChange = (
    rowIndex: number,
    taskIndex: number,
    field: keyof Task,
    value: string
  ) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex].tasks[taskIndex] = {
        ...newData[rowIndex].tasks[taskIndex],
        [field]: value,
      };
      return newData;
    });
  };

  const handleFormChange = (field: keyof FormDetails, value: string) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const formData = {
      combinedData: {
        ...formDetails,
        weeklyPeriod: f,
        timesheet: tableData,
        userID: userZ.id,
        Approval_Status: "Pending",
      },
    };

    const res = await axios.post<TableRow, FormDetails>(
      "http://localhost:3000/api/timesheets",
      {
        formData: formData,
      }
    );
    window.location.reload();
    console.log(res);
  };
  const fetchTimesheets = React.useCallback(async () => {
    try {
      const response = await axios.get<Timesheet[]>(
        "http://localhost:3000/api/timesheets"
      );

      const timesheets = response.data;

      const userTimesheets = timesheets.filter((timesheet) =>
        timesheet.tableRows.some((user) => user.userId === userZ.id)
      );
      setFilteredTimesheets(userTimesheets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userZ.id]);

  const fetchprojects = async () => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3000/api/projects"
      );
      console.log(response.data);
      setprojects(response.data);
    } catch (error) {
      toast.error(
        "An error occured while fetching projects. Please reload the screen and try again."
      );
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("user");
    }
    fetchprojects();
    fetchTimesheets();
  }, [fetchTimesheets]);

  return (
    <>
      <div className="grid bg-[#F5F5F5] border-2 border-primary p-8 rounded-xl">
        <form className="grid grid-cols-3 border-b-2 border-secondary pb-8 gap-y-4">
          <div>
            <label className="grid w-[60%] mb-1 text-[1.2rem]">Month:</label>
            <input
              className="px-4 py-1 border border-black focus:outline-primary rounded-xl"
              type="text"
              value={formDetails.month}
              onChange={(e) => handleFormChange("month", e.target.value)}
            />
          </div>
          <div>
            <label className="grid w-[60%] mb-1 text-[1.2rem]">Name:</label>
            <input
              className="px-4 py-1 border border-black rounded-xl pointer-events-none"
              value={fullName}
              readOnly
            />
          </div>
          <div>
            <label className="grid w-[60%] mb-1 text-[1.2rem]">Position:</label>
            <input
              className="px-4 py-1 border border-black focus:outline-primary rounded-xl w-[70%]"
              type="text"
              value={formDetails.role}
              onChange={(e) => handleFormChange("month", e.target.value)}
            />
          </div>
          <div className="grid w-[60%]">
            <label htmlFor="name" className="mb-1 text-[1.2rem]">
              Project Name
            </label>
            <select
              name="name"
              className="border border-black focus:outline-primary rounded-xl h-auto"
              value={formDetails.projectName}
              onChange={handleProjectChange}
            >
              <option value={""}>Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.Project_Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="grid w-[60%] mb-1 text-[1.2rem]">
              Project Manager:
            </label>
            <input
              className="px-4 py-1 border border-black rounded-xl pointer-events-none"
              value={formDetails.projectManager}
              readOnly
            />
          </div>
          <div className="period grid">
            <label htmlFor="date" className="mb-1 text-[1.2rem]">
              Weekly Period:
            </label>
            <Popover>
              <PopoverTrigger
                asChild
                className=" bg-white border border-black focus:outline-primary rounded-xl"
              >
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd")} -{" "}
                        {format(date.to, "LLL dd")}
                      </>
                    ) : (
                      format(date.from, "LLL dd")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  className="border-2 border-primary rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
        <table className="mt-8">
          <thead className="pb-2">
            <tr>
              <th>Weekday</th>
              <th>
                Public/Normal Day{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="rounded-full">
                      <Button variant="outline">?</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
              <th>Total Hours</th>
              <th>Tasks Performed</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-secondary py-2">
                <td className="text-center">
                  <input
                    className="py-1 px-2 border-black focus:outline-primary rounded-xl"
                    type="date"
                    value={row.weekday}
                    onChange={(e) =>
                      setTableData((prevData) => {
                        const newData = [...prevData];
                        newData[rowIndex].weekday = e.target.value;
                        return newData;
                      })
                    }
                  />
                </td>
                <td className="text-center">
                  <select name="" id="" className="w-[10vw] ">
                    <option value="">Select type of day</option>
                    <option value="publicDay">Public Holiday</option>
                    <option value="normalDay">Work/Normal Day</option>
                  </select>
                </td>
                <td className="text-center">
                  <input
                    className="w-[25%] py-1 pl-4 border-black focus:outline-primary rounded-xl"
                    type="number"
                    value={row.totalHours}
                    onChange={(e) =>
                      setTableData((prevData) => {
                        const newData = [...prevData];
                        newData[rowIndex].totalHours = parseInt(e.target.value);
                        return newData;
                      })
                    }
                  />
                </td>
                <td className="grid text-center">
                  {row.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="flex justify-center items-center mb-2 gap-x-1"
                    >
                      <input
                        className="py-1 px-4 border border-black focus:outline-primary rounded-xl w-1/2"
                        type="text"
                        value={task.taskPerformed}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            taskIndex,
                            "taskPerformed",
                            e.target.value
                          )
                        }
                      />
                      <select
                        className="w-[8vw] h-auto"
                        value={task.taskStatus}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            taskIndex,
                            "taskStatus",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select status</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  ))}
                  <Button
                    onClick={() => handleAddTask(rowIndex)}
                    className="grid w-fit justify-self-center rounded-xl text-white bg-secondary hover:text-secondary hover:font-semibold hover:bg-transparent mt-2"
                  >
                    Add Task
                  </Button>
                </td>
                <td className="text-center">
                  <textarea
                    className="px-4 border border-black focus:outline-primary rounded-xl"
                    value={row.comment}
                    onChange={(e) =>
                      setTableData((prevData) => {
                        const newData = [...prevData];
                        newData[rowIndex].comment = e.target.value;
                        return newData;
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          onClick={handleSubmit}
          className="w-[15%] h-[80%] text-xl grid justify-self-end mt-4 rounded-xl text-white"
        >
          Submit
        </Button>
      </div>

      <h2 className="text-center text-5xl my-12 text-secondary font-medium">
        Your Timesheets
      </h2>
      <div className="timesheets-container w-[80%] mx-auto">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by project name...."
              value={
                (table.getColumn("projectName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("projectName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm px-4 py-1 border border-black focus:outline-primary rounded-xl"
            />
          </div>

          <div className="border-2 border-primary rounded-xl">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-secondary"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-[1rem] font-medium"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center font-bold text-xl text-secondary"
                    >
                      No timesheets for now.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing {table.getState().pagination.pageIndex + 1} to{" "}
              {table.getPageCount().toLocaleString()} out of{" "}
              {table.getRowCount().toLocaleString()} Records.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
