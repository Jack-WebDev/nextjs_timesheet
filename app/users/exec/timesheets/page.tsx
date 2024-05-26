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

  const handleApprove = async (id: string) => {
    await axios.put(`http://localhost:3000/api/timesheets/${id}`, {
      Approval_Status: `Approved`,
    });
    window.location.reload()

  };

  const handleReject = async (id: string) => {
    await axios.put(`http://localhost:3000/api/timesheets/${id}`, {
      Approval_Status: `Rejected`,
    });
    window.location.reload()

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
        console.log(timesheet.id);
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
                    <DialogTitle className="flex justify-around items-center text-2xl">
                      Timesheet Details
                      <span className="text-xl">
                        Weekly Period: <b className="text-primary">{timesheet.weeklyPeriod}</b>
                      </span>
                    </DialogTitle>
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
                              className="text-center border-b border-secondary"
                            >
                              <td>
                                <p>{r.weekday}</p>
                              </td>

                              <td>
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

                    <div className="flex justify-evenly items-end mt-4 approval_process">
                      <div className="btns flex items-end gap-x-4 justify-items-end">
                        <Button
                          onClick={() => handleApprove(timesheet.id)}
                          className="bg-green-500 text-white rounded-xl hover:bg-green-400"
                        >
                          <FaThumbsUp color="white" className="mr-2" /> Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(timesheet.id)}
                          className="bg-red-500 text-white rounded-xl hover:bg-red-400"
                        >
                          <FaThumbsDown color="white" className="mr-2" /> Reject
                        </Button>
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

      const userTimesheets = timesheets.filter((timesheet) => {
        const isApprovedBy = timesheet.Approval_Status.includes("Approved by");
        const isRejectedBy = timesheet.Approval_Status.includes("Rejected by");

        return (isApprovedBy || isRejectedBy);
      });

      console.log(userTimesheets);
      setFilteredTimesheets(userTimesheets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

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
          <div className="border-2 border-primary rounded-xl bg-white">
            <Table className="rounded-xl">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b border-secondary">
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
                      className="h-24 text-center text-secondary font-semibold text-2xl"
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
