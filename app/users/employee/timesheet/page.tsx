"use client";

import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useEffect, useState } from "react";
import Card from "@/components/timesheet/Card";
import { format } from "date-fns";
import axios from "axios";
import { getSession } from "@/actions";

import * as React from "react"
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
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
      header:"Project Name",
      cell: ({ row }) => <div className="lowercase">{row.getValue("Project_Name")}</div>,
    },
    {
      accessorKey: "Task_performed",
      header: "Task Performed",
      cell: ({ row }) => <div className="lowercase">{row.getValue("Task_performed")}</div>,
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-start">Actions</div>,
      cell: ({ row }) => {
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  
  ]

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
  })



  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("user");
    }
    fetchTimesheets()
  }, []);

  const fetchTimesheets = async () => {
    const sessionData = await getSession()
    

    try {
      const response = await axios.get<Timesheet[]>("http://localhost:3000/api/timesheets");

      const timesheets = response.data;

      const userTimesheets = timesheets.filter((timesheet) =>
        timesheet.Full_Name === sessionData.Name
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
        <h2 className="text-center text-3xl text-secondary">Your Timesheets</h2>

        <div className="timesheets-container mx-auto grid grid-cols-3 gap-x-20 gap-y-8">
          {/* {filteredTimesheets.map((timesheet) => (
            <div
              className="card__container h-fit bg-white border-2 border-primary rounded-xl p-4"
              key={timesheet.id}
            >
              <>
                <div className="card__head grid gap-4">
                  <h1 className="font-bold">
                    Full Name: {timesheet.Full_Name}
                  </h1>
                  <h2>Project Name: {timesheet.Project_Name}</h2>
                </div>
                <div className="card__body grid gap-4">
                  <div>
                    <h2>Task Performed: {timesheet.Task_performed}</h2>
                    <h3 className="font-bold">
                      Calendar Week: {timesheet.Week}
                    </h3>
                  </div>

                  {
                    <div className="week-days__container">
                      <h4 className="font-bold">Daily Hours</h4>
                      <div className="week-days grid gap-2">
                        <span>Monday: {timesheet.Monday} hours</span>
                        <span>Tuesday: {timesheet.Tuesday} hours</span>
                        <span>Wednesday: {timesheet.Wednesday} hours</span>
                        <span>Thursday: {timesheet.Thursday} hours</span>
                        <span>Friday: {timesheet.Friday} hours</span>
                      </div>
                      <h4 className="font-bold">
                        Total hours worked: {timesheet.Total_hours}
                      </h4>
                      <br />
                      <h3>Approval Status: {timesheet.Approval_Status}</h3>
                    </div>
                  }
                </div>
              </>
            </div>
          ))} */}
              <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("Project_Name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Project_Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
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
                  )
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
        <div className="flex-1 text-sm text-muted-foreground">Showing {" "}
          {table.getFilteredSelectedRowModel().rows.length} to {" "}
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
