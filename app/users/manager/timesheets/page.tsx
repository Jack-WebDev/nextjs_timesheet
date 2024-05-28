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
import ApproveTimesheet from "@/components/dialogUI/ApproveTimesheet";


type AddTask = {
  taskPerformed: string;
  taskStatus: string;
};

type TableRow = {
  weekday: string;
  typeOfDay: string;
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
  typeOfDay: string;
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
  comments: string;
};

export default function Timesheet() {
  const [data, setFilteredTimesheets] = useState<Timesheet[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // const [task,setTasks] = useState<Task[]>([])

  const userZ = useUser();

  console.log(comment);
  console.log(isOpen)

  const handleCommentChange = (e:any) => {
    setComment(e.target.value);
  };

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
        
          <ApproveTimesheet timesheet={timesheet}/>

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
              className="max-w-sm rounded-xl"
            />
          </div>
          <div>
            <Table className="rounded-xl">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-secondary"
                  >
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
