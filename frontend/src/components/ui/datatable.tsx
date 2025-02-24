"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
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
	ArrowUpDown,
	ChevronDown,
	MoreHorizontal,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
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
import { Publisher } from "@/lib/observer";
import type { Subscriber } from "@/lib/observer";
import { QueryObserverResult } from "@tanstack/react-query";

const editRowPublisher = new Publisher<string>();
const deleteRowPublisher = new Publisher<string>();

function handlerEditRow(rowId: string) {
	editRowPublisher.notify(rowId);
}

function handlerDeleteRow(rowId: string) {
	deleteRowPublisher.notify(rowId);
}

export const baseColumns: ColumnDef<Data>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-4">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => handlerEditRow(row.getValue("hash"))}
						>
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => handlerDeleteRow(row.getValue("hash"))}
						>
							Deletar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
];

export interface Data {
	[key: string]: string | React.ReactNode;
}

export interface DataTableProps {
	data: Data[];
	pagination: PaginationState;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
	onChangePage?: () => void
	totalItems?: number;
	columnsAliases?: { [key: string]: string };
	onEditRow?: (rowId: string) => void;
	onDeleteRow?: (rowId: string) => void;
	onPageChange?: (page: number) => void;
}

const ID_COLUMNS = new Set(["id", "hash"]);

export function DataTable({
	data,
	columnsAliases,
	totalItems,
	pagination,
	setPagination,
	onEditRow,
	onDeleteRow,
}: DataTableProps) {
	const columns = Object.keys((data.length && data[0]) || {});
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	React.useEffect(() => {
    console.log(data)
	}, [data])

	React.useEffect(() => {
		setColumnVisibility({ hash: false });

		const editRowSubscriber: Subscriber<string> = {
			update(rowId: string) {
				if (!onEditRow) return;

				onEditRow(rowId);
			},
		};

		const deleteRowSubscriber: Subscriber<string> = {
			update(rowId: string) {
				if (!onDeleteRow) return;

				onDeleteRow(rowId);
			},
		};

		editRowPublisher.subscribe(editRowSubscriber);
		deleteRowPublisher.subscribe(deleteRowSubscriber);

		return () => {
			editRowPublisher.unsubscribe(editRowSubscriber);
			deleteRowPublisher.unsubscribe(deleteRowSubscriber);
		};
	}, []);

	const columnsDef: ColumnDef<Data>[] = columns.map((column) => {
		const isId = ID_COLUMNS.has(column);

		const columnToAdd: ColumnDef<Data> = {
			enableHiding: !isId,
			accessorKey: column,
			header: () => (
				<span className="capitalize">{columnsAliases?.[column] || column}</span>
			),
			cell: ({ row }) => {
				const cellValue = row.getValue(column);

				const isString = typeof cellValue === "string";
				const isReactNode = React.isValidElement(cellValue);

				if (!isString && !isReactNode) {
					return;
				}

				const getCellValueByType = {
					string: () => {
						const cell = cellValue as string;
						const isTextTooLong = cell.length > 32;
						const extraClasses =
							"border-dotted border-b-neutral-500 border-b-2 cursor-help";
						const text = isTextTooLong ? cell.slice(0, 32) + "..." : cell;

						return (
							<div
								className={`lower text-nowrap ${isTextTooLong && extraClasses}`}
								title={cell}
							>
								{text}
							</div>
						);
					},
					reactNode: () => cellValue,
				};

				const cellType = isString ? "string" : "reactNode";
				const cell = getCellValueByType[cellType]();

				return cell;
			},
		};

		return columnToAdd;
	});

	const allColumns: ColumnDef<Data>[] = [...baseColumns, ...columnsDef];

	const table = useReactTable({
		data,
		columns: allColumns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		pageCount: Math.ceil((totalItems || 0) / pagination.pageSize),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4 px-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Colunas <ChevronDown />
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
														header.getContext(),
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
												cell.getContext(),
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
					{table.getFilteredSelectedRowModel().rows.length} de{" "}
					{table.getFilteredRowModel().rows.length} linhas selecionadas.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
						  setPagination(prev => ({...prev, pageIndex: pagination.pageIndex - 1}))
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
						  setPagination(prev => ({...prev, pageIndex: pagination.pageIndex + 1}))
						}}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
