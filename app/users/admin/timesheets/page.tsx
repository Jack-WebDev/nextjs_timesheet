"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Timesheet = {
  Friday: string;
  Monday: string;
  Project_Name: string;
  Task_performed: string;
  Thursday: string;
  Total_hours: string;
  Tuesday: string;
  Wednesday: string;
  Week: string;
  Full_Name: string;
  id: string;
  Approval_Status: string;
  Saturday: string;
  Sunday: string;
};
const Timesheets = () => {
  const [data, setTimesheets] = useState<Timesheet[]>([]);

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
      accessorKey: "Project_Name",
      header: "Project Name",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("Project_Name")}</div>
      ),
    },
    {
      accessorKey: "Full_Name",
      header: "FullName",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Full_Name")}</div>
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
                  <div className="grid gap-4 py-4">
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Full Name:</p>
                      <p className="w-full">{timesheet.Full_Name}</p>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Project Name:</p>
                      <p className="w-full">{timesheet.Project_Name}</p>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Task(s) Performed:</p>
                      <p className="w-full">{timesheet.Task_performed}</p>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Week:</p>
                      <p className="w-full">{timesheet.Week}</p>
                    </div>

                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Total hours:</p>
                      <p className="w-full">{timesheet.Total_hours}</p>
                    </div>

                    <h2>Daily Hours:</h2>
                    <div className="daily-hours grid grid-cols-2">
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Monday:</p>
                        <p className="w-full">{timesheet.Monday}</p>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Tuesday:</p>
                        <p className="w-full">{timesheet.Tuesday}</p>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Wednesday:</p>
                        <p className="w-full">{timesheet.Wednesday}</p>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Thursday:</p>
                        <p className="w-full">{timesheet.Thursday}</p>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Friday:</p>
                        <p className="w-full">{timesheet.Friday}</p>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Saturday:</p>
                        <p className="w-full">{timesheet.Saturday}</p>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <p className="w-full">Sunday:</p>
                        <p className="w-full">{timesheet.Sunday}</p>
                      </div>
                    </div>
                  </div>

                  <div className="buttons flex gap-8">
                    <button
                      type="button"
                      className="bg-[#00ed64] text-white px-4 py-2 rounded-xl"
                      onClick={() => handleApprove(timesheet.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="bg-red-600 text-white px-4 py-2 rounded-xl"
                      onClick={() => handleReject(timesheet.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuTrigger>
          </DropdownMenu>
        );
      },
    },
  ];

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get<Timesheet[]>(
          "http://localhost:3000/api/timesheets"
        );

        console.log(response.data);

        setTimesheets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTimesheets();
  }, []);

  const handleApprove = async (id: string, approval: string) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/timesheets/${id}`,
        {
          Approval_Status: approval,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occured while Approving timesheet. Please try again."
      );
    }
  };

  const handleReject = async (id: string, approval: string) => {
    try {
      await axios.put(`http://localhost:3000/api/timesheets/${id}`, {
        Approval_Status: approval,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occured while Rejecting timesheet. Please try again."
      );
    }
  };

  return (
    <div className="timesheets-container w-[80%] mx-auto">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by project name...."
            value={
              (table.getColumn("Project_Name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("Project_Name")
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getFilteredSelectedRowModel().rows.length} to{" "}
            {table.getFilteredRowModel().rows.length} out of 20 records.
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
  );
};

export default Timesheets;
