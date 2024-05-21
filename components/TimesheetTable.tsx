"use client"

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



const data: Timesheet[] = [
  {
    id: '1',
    Full_Name: 'John Doe',
    Week: '2024-05-01 to 2024-05-07',
    Project_Name: 'Project Alpha',
    Task_performed: 'Development',
    Monday: '8',
    Tuesday: '8',
    Wednesday: '8',
    Thursday: '8',
    Friday: '8',
    Total_hours: '40',
    Approval_Status: 'Approved'
  },
  {
    id: '2',
    Full_Name: 'Jane Smith',
    Week: '2024-05-01 to 2024-05-07',
    Project_Name: 'Project Beta',
    Task_performed: 'Testing',
    Monday: '7',
    Tuesday: '7',
    Wednesday: '7',
    Thursday: '7',
    Friday: '7',
    Total_hours: '35',
    Approval_Status: 'Pending'
  },
  {
    id: '3',
    Full_Name: 'Alice Johnson',
    Week: '2024-05-01 to 2024-05-07',
    Project_Name: 'Project Gamma',
    Task_performed: 'Design',
    Monday: '6',
    Tuesday: '6',
    Wednesday: '6',
    Thursday: '6',
    Friday: '6',
    Total_hours: '30',
    Approval_Status: 'Rejected'
  },
  {
    id: '4',
    Full_Name: 'Bob Brown',
    Week: '2024-05-01 to 2024-05-07',
    Project_Name: 'Project Delta',
    Task_performed: 'Research',
    Monday: '5',
    Tuesday: '5',
    Wednesday: '5',
    Thursday: '5',
    Friday: '5',
    Total_hours: '25',
    Approval_Status: 'Approved'
  },
  {
    id: '5',
    Full_Name: 'Charlie Davis',
    Week: '2024-05-01 to 2024-05-07',
    Project_Name: 'Project Epsilon',
    Task_performed: 'Management',
    Monday: '4',
    Tuesday: '4',
    Wednesday: '4',
    Thursday: '4',
    Friday: '4',
    Total_hours: '20',
    Approval_Status: 'Pending'
  }
];


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

export default function TimesheetTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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

  return (
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
  )
}
