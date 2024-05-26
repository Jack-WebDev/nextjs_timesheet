"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";


import { DotsHorizontalIcon } from "@radix-ui/react-icons";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useUser } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


type Project = {
  id: string;
  Project_Name: string;
  Project_Manager: string,
  Client_Name: string,
  Description: string;
  assignedMembers: string[];
};

const ProjectTable: React.FC = () => {
  const [cleaned, setCleaned] = useState<Project[]>([]);
  const [data, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const name = useUser()

  const fetchprojects = useCallback(async() => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3000/api/projects"
      );

      const projects = response.data;



      setProjects(projects);
    } catch (error) {
      console.log(error);
    }  }, []); 

  useEffect(() => {
    fetchprojects();
  }, [fetchprojects]); 



  const truncateText = (text: string, wordLimit: number) => {
    if (!text) return "No Description";

    const words = text.split(" ");

    if (words.length > 1) {
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(" ") + ".....";
    }

    if (text.length <= 15) {
      return text;
    }
    return text.slice(0, 15) + ".....";
  };


  console.log(cleaned)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilter(searchTerm);
    const filtered = cleaned.filter((clean) =>
      clean.Project_Name.toLowerCase().includes(searchTerm)
    );
    setProjects(filtered);
  };

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "Project_Name",
      header: "Project Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Project_Name")}</div>
      ),
    },
    {
      accessorKey: "Client_Name",
      header: "Client Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Client_Name")}</div>
      ),
    },
    {
      accessorKey: "Project_Manager",
      header: "Project Manager",
      cell: ({ row }) => (
        <div className="capitalize">{truncateText(row.getValue("Project_Manager"), 5)}</div>
      ),
    },

    {
      accessorKey: "actions",
      header: () => <div className="text-start">Actions</div>,
      cell: ({ row }) => {
        const project = row.original;
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
                    <DialogTitle>Project Details</DialogTitle>
                  </DialogHeader>
                  <div>
                  <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Project Name:
              </Label>
              <p>{project.Project_Name}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Project Manager:
              </Label>
              <p>{project.Project_Manager}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Client Name:
              </Label>
              <p>{project.Client_Name}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Project Description:
              </Label>
              <p>{project.Description}</p>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Assigned to the project:
              </Label>
              <p>
                {project.assignedMembers.map((member, index) => (
                  <div key={index} className="flex">
                    <span>{member}</span>
                  </div>
                ))}
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

  return (
    <>
      <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter project manager..."
          value={(table.getColumn("Project_Manager")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Project_Manager")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      </>
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
    </>
  );
};

export default ProjectTable;
