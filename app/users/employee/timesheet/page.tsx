"use client";

import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useEffect, useState } from "react";
import Card from "@/components/timesheet/Card";
import { format } from "date-fns";
import axios from "axios";
import { getSession } from "@/actions";

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
import { Label } from "@/components/ui/label";

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
};

const Timesheet = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date()
  );
  const [data, setFilteredTimesheets] = useState<Timesheet[]>([]);
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
      accessorKey: "Task_performed",
      header: "Task Performed",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("Task_performed")}</div>
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
                      <p className="w-full">Approval Status:</p>
                      <p className="w-full">{timesheet.Approval_Status}</p>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Project Name:</p>
                      <p className="w-full">{timesheet.Project_Name}</p>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Week:</p>
                      <p className="w-full">{timesheet.Week}</p>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <p className="w-full">Total hours:</p>
                      <p className="w-full">{timesheet.Total_hours}</p>
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
    if (typeof window !== "undefined") {
      localStorage.getItem("user");
    }
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    const sessionData = await getSession();

    try {
      const response = await axios.get<Timesheet[]>(
        "http://localhost:3000/api/timesheets"
      );

      const timesheets = response.data;

      const userTimesheets = timesheets.filter(
        (timesheet) => timesheet.Full_Name === sessionData.Name
      );

      setFilteredTimesheets(userTimesheets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDateToString = (date: Date | null): string => {
    return date ? format(date, "dd/MM/yyyy") : "";
  };

  const handleUpdateDateRange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    const date = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("week", date);
    } else {
      console.error("localStorage is not available.");
    }
  };

  return (
    <div>
      <main>
        <div className="flex justify-center gap-x-12">
          <DateRangeSelector onUpdateDateRange={handleUpdateDateRange} />

          <div className="timesheet__details flex items-center justify-around mt-12">
            <div className="time__period flex items-center gap-x-4">
              <h2 className="font-semibold">Week:</h2>
              <span className="bg-primary text-white p-2 rounded-xl">
                {formatDateToString(selectedStartDate)} -{" "}
                {formatDateToString(selectedEndDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="timesheet__container">
          <Card />
        </div>
        <h2 className="text-center text-3xl text-secondary my-[3rem]">
          Your Timesheets
        </h2>

        <div className="timesheets-container w-[80%] mx-auto">
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter by project name...."
                value={
                  (table
                    .getColumn("Project_Name")
                    ?.getFilterValue() as string) ?? ""
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
      </main>
    </div>
  );
};

export default Timesheet;
