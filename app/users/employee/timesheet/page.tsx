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

export default function Timesheet() {
  const [tableData, setTableData] = useState<TableRow[]>(initialData);
  const [data, setFilteredTimesheets] = useState<Timesheet[]>([]);
  // const [task,setTasks] = useState<Task[]>([])

  const [formDetails, setFormDetails] = useState<FormDetails>({
    month: "",
    name: "",
    role: "",
    projectManager: "",
    projectName: "",
  });
  const userZ = useUser();

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
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <span className="cursor-pointer">
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Timesheet Details</DialogTitle>
                  </DialogHeader>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Weekday</th>
                          {/* <th>
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
            </th> */}
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
                            <tr key={r.id}>
                              <td>
                                <p>{r.weekday}</p>
                              </td>
                              {/* <td>
                <select name="" id="">
                  <option value="">Select type of day</option>
                  <option value="publicDay">Public Holiday</option>
                  <option value="normalDay">Work/Normal Day</option>
                </select>
              </td> */}
                              <td>
                                <p>{r.totalHours}</p>
                              </td>
                              <td>
                                {(r.tasks &&
                                  r.tasks?.map((t) => (
                                    <div key={t.id}>
                                      <p>Task Performed: {t.taskPerformed}</p>
                                    </div>
                                  ))) || <span>No data available</span>}
                              </td>
                              <td>
                                {(r.tasks &&
                                  r.tasks?.map((t) => (
                                    <div key={t.id}>
                                      <p>Task Status: {t.taskStatus}</p>
                                    </div>
                                  ))) || <span>No data available</span>}
                              </td>
                              <td>
                                <p>{r.comment}</p>
                              </td>
                            </tr>
                          ))}
                        {/* {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                  <p>{timesheet.}</p>
              </td>
              <td>
                <select name="" id="">
                  <option value="">Select type of day</option>
                  <option value="publicDay">Public Holiday</option>
                  <option value="normalDay">Work/Normal Day</option>
                </select>
              </td>
              <td>
                  <p>{timesheet.totalHours}</p>
              </td>
              <td>
                {timesheet.tasks.map((task) => (
                  <div key={task.tableRowId}>
                  <p>Task Performed: {task.taskPerformed}</p>
                  <p>Task Status: {task.taskStatus}</p>
                  </div>
                ))}
              </td>
              <td>
                <p>{timesheet.comment}</p>
              </td>
            </tr>
          ))} */}
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

  const f = `${date?.from?.toLocaleDateString()} to ${date?.to?.toLocaleDateString()}`;

  const handleAddTask = (index: number) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].tasks.push({ taskPerformed: "", taskStatus: "" });
      return newData;
    });
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
    // const timesheetIDs = data
    //   .filter((Tid) => Tid.Approval_Status === "Draft")
    //   .map((Tid) => Tid.id);

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

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("user");
    }
    fetchTimesheets();
  }, [fetchTimesheets]);

  return (
    <>
      <div>
        <form>
          <label>
            Month:
            <input
              type="text"
              value={formDetails.month}
              onChange={(e) => handleFormChange("month", e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={formDetails.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              value={formDetails.role}
              onChange={(e) => handleFormChange("role", e.target.value)}
            />
          </label>
          <label>
            Project Manager:
            <input
              type="text"
              value={formDetails.projectManager}
              onChange={(e) =>
                handleFormChange("projectManager", e.target.value)
              }
            />
          </label>
          <label>
            Project Name:
            <input
              type="text"
              value={formDetails.projectName}
              onChange={(e) => handleFormChange("projectName", e.target.value)}
            />
          </label>
          <Popover>
            <PopoverTrigger asChild>
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
              />
            </PopoverContent>
          </Popover>
        </form>
        <table>
          <thead>
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
              <tr key={rowIndex}>
                <td>
                  <input
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
                <td>
                  <select name="" id="">
                    <option value="">Select type of day</option>
                    <option value="publicDay">Public Holiday</option>
                    <option value="normalDay">Work/Normal Day</option>
                  </select>
                </td>
                <td>
                  <input
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
                <td>
                  {row.tasks.map((task, taskIndex) => (
                    <div key={taskIndex}>
                      <input
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
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  ))}
                  <button onClick={() => handleAddTask(rowIndex)}>
                    Add Task
                  </button>
                </td>
                <td>
                  <textarea
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
        <button onClick={handleSubmit}>Submit</button>
      </div>

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
              className="max-w-sm rounded-xl"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
                      className="h-24 text-center"
                    >
                      No timesheets.
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
