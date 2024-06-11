"use client";

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

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/store";
import { TimesheetProps } from "@/types/timesheetProps";
import { Project } from "@/types/projectProps";
import { TaskProps } from "@/types/taskProps";
import { TableRowsProps } from "@/types/tableRowsProps";
import useFetchTimesheets from "@/hooks/useFetchTimesheets";
import useFetchProjects from "@/hooks/useFetchProjects";
import useFetchUsers from "@/hooks/useFetchUsers";
import { UserProps } from "@/types/userProps";

type FormDetails = {
  month: string;
  name: string;
  role: string;
  projectManager: string;
  projectName: string;
};

const initialData: TableRowsProps[] = [
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",
    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",

    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",

    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",

    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",

    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",

    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
  {
    weekday: new Date().toISOString().split("T")[0],
    typeOfDay: "",

    totalHours: 0,
    totalMinutes: 0,
    tasks: [],
    comment: "",
  },
];

export default function Timesheet() {
  const timesheetData = useFetchTimesheets();
  const projectsData = useFetchProjects();
  const userData = useFetchUsers();
  const [tableData, setTableData] = useState<TableRowsProps[]>(initialData);
  const [data, setFilteredTimesheets] = useState<TimesheetProps[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [chosenProject, setChosenProject] = useState("");
  const userZ = useUser();
  const fullName = `${userZ.Name} ${userZ.Surname}`;
  const [query, setQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

  const [formDetails, setFormDetails] = useState<FormDetails>({
    month: "",
    name: fullName,
    role: userZ.Position,
    projectManager: "",
    projectName: "",
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TimesheetProps>[] = [
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
      sortDescFirst: true,
      enableSorting: true,
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
                    <div className="grid text-xl">
                      <div className="flex">
                        Approval Status:
                        <span className={statusClass}>
                          {timesheet.Approval_Status}
                        </span>
                      </div>
                    </div>
                  </DialogHeader>
                  <div>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Weekday</th>
                          <th>Type Of Day</th>
                          <th>Total Time</th>
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
                                <p>
                                  {r.typeOfDay === "" ? "N/A" : r.typeOfDay}
                                </p>
                              </td>
                              <td className="text-center">
                                <p>{`${r.totalHours} hrs ${r.totalMinutes} mins`}</p>
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

                    <div className="mt-4">
                      <h2 className="font-semibold">
                        Project Manager&apos;s comments:
                      </h2>
                      <p>
                        {timesheet.comments === ""
                          ? "No comment."
                          : timesheet.comments}
                      </p>
                    </div>
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
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 0),
    to: addDays(new Date(), 7),
  });


  useEffect(() => {
    if (timesheetData) {
      const filteredData = timesheetData.filter(item => item.userId === userZ.id);
      setFilteredTimesheets(filteredData);
    }
  }, [timesheetData, userZ.id]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData);
    }
  }, [projectsData]);

  const formattedDate = `${date?.from?.toISOString().split("T")[0]} to ${
    date?.to?.toISOString().split("T")[0]
  }`;


  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          (user.Name.toLowerCase().includes(query.toLowerCase()) ||
           user.Surname.toLowerCase().includes(query.toLowerCase())) &&
          user.id !== userZ.id 
      )
    );
  }, [query, users, userZ]);

  const handleSelectUser = (user: UserProps) => {
    setSelectedUser(user);
    setFormDetails({
      ...formDetails,
      projectManager: `${user.Name} ${user.Surname}`,
    });
    setQuery("");
    setFilteredUsers([]);
  };

  const handleAddTask = (index: number) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].tasks.push({ taskPerformed: "", taskStatus: "", hours: 0, minutes: 0 });
      const { totalHours, totalMinutes } = calculateTotalTime(newData[index].tasks);
      newData[index].totalHours = totalHours;
      newData[index].totalMinutes = totalMinutes;
      return newData;
    });
  };
  

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectId = event.target.value as string;

    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    if (selectedProject) {
      setChosenProject(selectedProject.id);

      setFormDetails({
        ...formDetails,
        projectName: selectedProject.Project_Name,
      });
    } else {
      setFormDetails({
        ...formDetails,
        projectName: "",
      });
    }
  };

  const handleChange = (rowIndex: number, taskIndex: number, field: string, value: any) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex].tasks[taskIndex] = {
        ...newData[rowIndex].tasks[taskIndex],
        [field]: value,
      };
      const { totalHours, totalMinutes } = calculateTotalTime(newData[rowIndex].tasks);
      newData[rowIndex].totalHours = totalHours;
      newData[rowIndex].totalMinutes = totalMinutes;
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
        weeklyPeriod: formattedDate,
        timesheet: tableData,
        userID: userZ.id,
        Approval_Status: "Pending",
      },
    };

    const res = await axios.post<TableRowsProps, FormDetails>(
      "/api/timesheets",
      {
        formData: formData,
      }
    );
    window.location.reload();
  };

  const calculateTotalTime = (tasks: TaskProps[]) => {
    let totalMinutes = 0;
    tasks.forEach((task) => {
      totalMinutes += task.hours * 60 + task.minutes;
    });
    const totalHours = Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    return { totalHours, totalMinutes };
  };

  return (
    <>
      <div className="grid bg-[#F5F5F5] border-2 border-primary p-8 rounded-xl">
        <form className="grid grid-cols-3 border-b-2 border-secondary pb-8 gap-y-4 items-end">
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
              className="px-4 py-1 border border-black focus:outline-primary rounded-xl w-[70%] pointer-events-none"
              value={userZ.Position}
              readOnly
            />
          </div>
          <div className="grid w-[60%]">
            <label htmlFor="name" className="mb-1 text-[1.2rem]">
              Project Name
            </label>
            <select
              name="name"
              className="border border-black focus:outline-primary rounded-xl h-[4vh]"
              value={chosenProject}
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
          <div className="grid justify-start items-end h-[10vh]">
            <>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your supervisor...."
                className="px-4 py-1 border border-black focus:outline-primary rounded-xl"
              />
            </>
            {query && (
              <ul className="bg-white rounded-xl py-2 px-4 shadow-xl mt-[10px] z-10">
                {filteredUsers.map((user) => (
                  <li className="cursor-pointer borderStyle hover:bg-[#F5F5F5]" key={user.id} onClick={() => handleSelectUser(user)}>
                    {user.Name} {user.Surname}
                  </li>
                ))}
              </ul>
            )}
            {selectedUser && (
              <div className="z-10">
                <p className="text-secondary font-bold bg-white rounded-xl py-2 px-4 shadow-xl mt-[10px]">
                  {selectedUser.Name} {selectedUser.Surname}
                </p>
              </div>
            )}
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
                  weekStartsOn={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
        <table className="mt-8">
          <thead className="pb-2">
            <tr>
              <th>Weekday</th>
              <th>Public/Normal Day </th>
              <th>Total Time</th>
              <th>Tasks Performed</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => {
              return (
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
                    <select
                      name=""
                      id=""
                      className="w-[10vw] "
                      value={row.typeOfDay}
                      onChange={(e) =>
                        setTableData((prevData) => {
                          const newData = [...prevData];
                          newData[rowIndex].typeOfDay = e.target.value;
                          return newData;
                        })
                      }
                    >
                      <option value="">Select type of day</option>
                      <option value="Public Holiday">Public Holiday</option>
                      <option value="Normal Day">Work/Normal Day</option>
                    </select>
                  </td>
                  <td className="text-center w-[10%]">
                  <input
                  className="pointer-events-none w-[100%] px-4"
                type="text"
                value={`${row.totalHours} hrs ${row.totalMinutes} mins`}
                readOnly
              />
                  </td>

                  <td className="grid text-center">
                    {row.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className="flex justify-center items-end mb-2 gap-x-4"
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
                          className="w-[8vw] h-[60%]"
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
                        <div className="grid w-[10%] justify-items-center">
                          <label htmlFor="hours">Hours</label>
                          <input
                            className="py-1 px-2 border border-black focus:outline-primary rounded-xl w-full"
                            type="number"
                            value={task.hours}
                            onChange={(e) =>
                              handleChange(
                                rowIndex,
                                taskIndex,
                                "hours",
                                parseInt(e.target.value, 10) || 0
                              )
                            }
                            placeholder="Hours"
                          />
                        </div>
                        <div className="grid w-[10%] justify-items-center">
                          <label htmlFor="minutes">Minutes</label>
                          <input
                            className="py-1 px-2 border border-black focus:outline-primary rounded-xl w-full"
                            type="number"
                            value={task.minutes}
                            onChange={(e) =>
                              handleChange(
                                rowIndex,
                                taskIndex,
                                "minutes",
                                parseInt(e.target.value, 10) || 0
                              )
                            }
                            placeholder="Minutes"
                          />
                        </div>
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
              );
            })}
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
        <div className="w-full bg-[#F5F5F5] p-4 rounded-xl border-2 border-primary">
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

          <div>
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
              Page {table.getState().pagination.pageIndex + 1} of{" "}
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
