"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";
import { Badge } from "@/components/ui/badge";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <Badge className={"border border-solid border-gray-400"}>
        {row.original.size}
      </Badge>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <Badge
        className={`border border-solid bg-transparent dark:text-white text-black${
          row.original.isFeatured ? "border-green-600" : "border-red-600"
        }`}
      >
        {row.original.isFeatured ? "Featured" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (
      <Badge
        className={`border border-solid bg-transparent dark:text-white text-black${
          row.original.isArchived ? "border-red-600" : " border-green-600 "
        }`}
      >
        {row.original.isArchived ? "Archived" : "Visible"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
