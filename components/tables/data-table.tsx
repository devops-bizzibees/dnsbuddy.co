// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { CSVLink } from "react-csv";

import type { ExtendedColumnDef } from "@/components/tables/columns";
import { timeUnix } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  download: boolean;
  pagination: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  download,
  pagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const csvHeader = columns.map((column) => ({
    label:
      (column.label || column.header).charAt(0).toUpperCase() +
      (column.label || column.header).slice(1),
    key: column.accessorKey,
  }));
  const csvBody = data.flatMap((row) => {
    const bodyRows: string[] = [];
    const uniqueRows: Set<string> = new Set();

    for (const [key, value] of Object.entries(row)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          const newRow = { ...row } as Record<string | number, string | number>;
          newRow[key] = item;
          const rowString = JSON.stringify(newRow);
          if (!uniqueRows.has(rowString)) {
            uniqueRows.add(rowString);
            bodyRows.push(newRow);
          }
        }
      } else {
        const rowString = JSON.stringify(row);
        if (!uniqueRows.has(rowString)) {
          let isValueArray = false;
          for (const val of Object.values(row)) {
            if (Array.isArray(val)) {
              isValueArray = true;
              break; // No need to continue checking if an array is found
            }
          }
          if (!isValueArray) {
            uniqueRows.add(rowString);
            bodyRows.push(row);
          }
        }
      }
    }

    return bodyRows;
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });
  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide());

  return (
    <div>
      <div className="flex items-center py-4">
        {hideableColumns.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
              <Button variant="outline" className="mr-auto">
                Columns
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
                      {column.columnDef.label || column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        {download ? (
          <Button variant="outline" className="ml-auto">
            <CSVLink
              headers={csvHeader}
              data={csvBody}
              filename={`dnsbuddy.co-${timeUnix()}.csv`}
            >
              Download
            </CSVLink>
          </Button>
        ) : null}
      </div>
      <div className="rounded border bg-black/5  px-4 py-4 dark:bg-white/5 ">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-lg font-semibold text-black dark:text-white "
                    >
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
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className="py-3 text-left dark:text-gray-300"
                      >
                        {Array.isArray(cell.getValue())
                          ? cell
                              .getValue()
                              .map((item) => <pre key={item}>{item}</pre>)
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                      </TableCell>
                    );
                  })}
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

      {pagination ? (
        <div className="flex items-center py-4">
          <div className="mr-auto space-x-1 ">
            <p className="h-10 px-4 py-2 dark:text-gray-300">
              Total Results: {table.getFilteredRowModel().rows.length}
            </p>
          </div>
          <div className="ml-auto space-x-1">
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
      ) : null}
    </div>
  );
}
