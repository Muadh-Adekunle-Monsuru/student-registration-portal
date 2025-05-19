'use client';

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
} from '@tanstack/react-table';
import {
	ArrowUpDown,
	ChevronDown,
	MoreHorizontal,
	Plus,
	Search,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { deleteStudent } from '@/lib/actions';
import { Student } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';

export function StudentsTable({ students: data }: { students: Student[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const router = useRouter();
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const columns: ColumnDef<Student>[] = [
		{
			accessorKey: 'matricNo',
			header: 'ID',
			cell: ({ row }) => (
				<div className='font-medium'>{row.getValue('matricNo')}</div>
			),
		},
		{
			accessorKey: 'firstName',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						First Name
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},
		{
			accessorKey: 'lastName',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Last Name
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'program',
			header: 'Program',
		},
		{
			accessorKey: 'semester',
			header: 'Semester',
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const student = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem
								onClick={() => {
									router.push(`/student/${student.id}`);
								}}
							>
								View full details
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={async () => {
									await deleteStudent(student.id);
									toast({
										title: 'Student deleted successfully',
									});
								}}
							>
								Delete Student
							</DropdownMenuItem>
							<DropdownMenuItem>Edit student</DropdownMenuItem>
							<DropdownMenuItem>Change status</DropdownMenuItem>
						</DropdownMenuContent>
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

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle>Students</CardTitle>
						<CardDescription>
							Manage student records and information.
						</CardDescription>
					</div>
					<Button asChild>
						<Link href='/registration'>
							<Plus className='mr-2 h-4 w-4' /> Add Student
						</Link>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className='flex items-center py-4'>
					<div className='relative max-w-sm'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search students...'
							value={
								(table.getColumn('firstName')?.getFilterValue() as string) ?? ''
							}
							onChange={(event) =>
								table.getColumn('firstName')?.setFilterValue(event.target.value)
							}
							className='max-w-sm pl-8'
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' className='ml-auto'>
								Columns <ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className='rounded-md border'>
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
										data-state={row.getIsSelected() && 'selected'}
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
										className='h-24 text-center'
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className='flex items-center justify-end space-x-2 py-4'>
					<div className='flex-1 text-sm text-muted-foreground'>
						{table.getFilteredSelectedRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className='space-x-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
