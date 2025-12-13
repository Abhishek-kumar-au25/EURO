'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Ride } from "@/lib/types";
import { parseISO } from "date-fns";
import { FormattedDate } from "../formatted-date";
import { Badge } from "../ui/badge";

export function CancellationsTable({ rides }: { rides: Ride[] }) {

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ride ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Cancelled By</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell className="font-medium">{ride.id}</TableCell>
              <TableCell>{ride.userName}</TableCell>
              <TableCell>{ride.driverName}</TableCell>
              <TableCell>
                <FormattedDate date={parseISO(ride.rideDate)} formatString="dd MMM, yyyy HH:mm"/>
              </TableCell>
              <TableCell>
                <Badge variant={ride.cancelledBy === 'Driver' ? 'destructive' : 'secondary'}>
                    {ride.cancelledBy}
                </Badge>
              </TableCell>
              <TableCell>{ride.cancellationReason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
