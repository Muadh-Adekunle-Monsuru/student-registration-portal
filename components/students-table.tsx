"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// Sample data
const data: Student[] = [
  {
    id: "STU001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    program: "Computer Science",
    semester: "Fall 2025",
    registrationDate: "2025-01-15",
    status: "Active",
  },
  {
    id: "STU002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    program: "Business Administration",
    semester: "Fall 2025",
    registrationDate: "2025-01-16",
    status: "Active",
  },
  {
    id: "STU003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    program: "Engineering",
    semester: "Fall 2025",
    registrationDate: "2025-01-17",
    status: "Pending",
  },
  {
    id: "STU004",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    program: "Medicine",
    semester: "Spring 2026",
    registrationDate: "2025-01-18",
    status: "Active",
  },
  {
    id: "STU005",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    program: "Arts",
    semester: "Fall 2025",
    registrationDate: "2025-01-19",
    status: "Inactive",
  },
  {
    id: "STU006",
    firstName: "Sarah",
    lastName: "Miller",
    email: "sarah.miller@example.com",
    program: "Law",
    semester: "Spring 2026",
    registrationDate: "2025-01-20",
    status: "Active",
  },
  {
    id: "STU007",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@example.com",
    program: "Computer Science",
    semester: "Summer 2026",
    registrationDate: "2025-01-21",
    status: "Active",
  },
  {
    id: "STU008",
    firstName: "Jessica",
    lastName: "Taylor",
    email: "jessica.taylor@example.com",
    program: "Business Administration",
    semester: "Fall 2025",
    registrationDate: "2025-01-22",
    status: "Pending",
  },
  {
    id: "STU009",
    firstName: "Robert",
    lastName: "Anderson",
    email: "robert.anderson@example.com",
    program: "Engineering",
    semester: "Spring 2026",
    registrationDate: "2025-01-23",
    status: "Active",
  },
  {
    id: "STU010",
    firstName: "Jennifer",
    lastName: "Thomas",
    email: "jennifer.thomas@example.com",
    program: "Medicine",
    semester: "Fall 2025",
    registrationDate: "2025-01-24",
    status: "Active",
  },
]

export type Student = {
  id: string
  firstName: string
  lastName: string
  email: string
  program: string
  semester: string
  registrationDate: string
  status: "Active" | "Inactive" | "Pending"
}

export function StudentsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "program",
      header: "Program",
    },
    {
      accessorKey: "semester",
      header: "Semester",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : status === "Inactive"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
          >
            {status}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(student.id)}>
                Copy student ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View student details</DropdownMenuItem>
              <DropdownMenuItem>Edit student</DropdownMenuItem>
              <DropdownMenuItem>Change status</DropdownMenuItem>
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Students</CardTitle>
            <CardDescription>Manage student records and information.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/registration">
              <Plus className="mr-2 h-4 w-4" /> Add Student
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
              className="max-w-sm pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
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
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
