"use client";

import formatTimeAgo from "@/lib/utils/formatTimeAgo";
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
import { useMemo } from "react";

type LinkAnalyticsTableProps = {
  visits: Visit[];
};

export default function LinkAnalyticsTable({
  visits,
}: LinkAnalyticsTableProps) {
  const columns = [
    { key: "ipAddress", label: "Ip" },
    { key: "country", label: "Country" },
    { key: "browser", label: "Browser" },
    { key: "device", label: "Device" },
    { key: "createdAt", label: "Created At" },
  ];

  const rows = useMemo(
    () =>
      visits.map((visit) => ({
        ...visit,
        createdAt: formatTimeAgo(visit.createdAt),
      })),
    [visits]
  );

  return (
    <div className="mt-4">
      <h2 className="font-semibold text-lg text-gray-500">Latests visits</h2>
      <Table className="mt-2">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
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
