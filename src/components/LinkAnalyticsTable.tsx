"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import type { Visit } from "@prisma/client";

type LinkAnalyticsTableProps = {
  visits: Visit[];
};

export default function LinkAnalyticsTable({
  visits,
}: LinkAnalyticsTableProps) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "country", label: "Country" },
    { key: "browser", label: "Browser" },
    { key: "device", label: "Device" },
    { key: "createdAt", label: "Date" },
  ];

  return (
    <div className="mt-4">
      <h2 className="font-semibold text-lg text-gray-500">Last visits</h2>
      <Table className="mt-2">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {visits.map((row) => (
            <TableRow key={row.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(row, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
