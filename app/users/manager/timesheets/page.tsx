"use client";

import * as React from "react";
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

import { Button } from "@/components/ui/button";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@/app/store";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { time } from "console";

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
  const [data, setFilteredTimesheets] = useState<Timesheet[]>([]);
  // const [task,setTasks] = useState<Task[]>([])

  const userZ = useUser();

  console.log(data);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleApprove = async (id:string) => {
    await axios.put(`http://localhost:3000/api/timesheets/${id}`, {
      Approval_Status: `Approved by ${userZ.Name} ${userZ.Surname}`,
    });
  };

  const handleReject = async (id:string) => {
    await axios.put(`http://localhost:3000/api/timesheets/${id}`, {
      Approval_Status: `Rejected by ${userZ.Name} ${userZ.Surname}`,
    });
  };

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
        console.log(timesheet.id)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <span className="cursor-pointer">
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </span>
                </DialogTrigger>
                <DialogContent className="w-[50%]">
                  <DialogHeader>
                    <DialogTitle className="flex justify-around items-center">
                      Timesheet Details{" "}
                      <span>
                        Weekly Period: <b>{timesheet.weeklyPeriod}</b>
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <div>
                    <table className="w-full">
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
                            <tr key={r.id} className="text-center">
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
                                      <p>
                                        Task Performed:{" "}
                                        {t.taskPerformed === ""
                                          ? "No Tasks"
                                          : t.taskPerformed}
                                      </p>
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

                    <div className="flex justify-evenly items-center border-t mt-4 border-black approval_process">
                      <div className="grid comment">
                        <label htmlFor="comment">Add comment</label>
                        <textarea className="mt-4" id="comment"></textarea>
                      </div>
                      <div className="btns flex items-end gap-x-4 justify-items-end">
                        <button
                          onClick={() => handleApprove(timesheet.id)}
                          className="border border-black"
                        >
                          <FaThumbsUp /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(timesheet.id)}
                          className="border border-black"
                        >
                          <FaThumbsDown /> Reject
                        </button>
                      </div>
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
    pageSize: 10,
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

  const fetchTimesheets = React.useCallback(async () => {
    try {
      const response = await axios.get<Timesheet[]>(
        "http://localhost:3000/api/timesheets"
      );

      const timesheets = response.data;
      // console.log(timesheets)

      const formattedUserFullName =
        `${userZ.Name.trim()} ${userZ.Surname.trim()}`.toLowerCase();

      const userTimesheets = timesheets.filter((timesheet) => {
        const formattedProjectManagerName = timesheet.projectManager
          .trim()
          .toLowerCase();
        return (
          formattedProjectManagerName === formattedUserFullName &&
          timesheet.Approval_Status === "Pending"
        );
      });

      console.log(userTimesheets);
      setFilteredTimesheets(userTimesheets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userZ.Name, userZ.Surname]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("user");
    }
    fetchTimesheets();
  }, [fetchTimesheets]);

  return (
    <>
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
