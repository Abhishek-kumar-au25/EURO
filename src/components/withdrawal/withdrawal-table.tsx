
'use client';

import { useState } from 'react';
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { WithdrawalRequest } from "@/lib/types";
import { parseISO } from 'date-fns';
import { FormattedDate } from '../formatted-date';

const statusVariantMap: Record<WithdrawalRequest['status'], 'info' | 'success' | 'destructive'> = {
  Pending: 'info',
  Approved: 'success',
  Rejected: 'destructive',
};

export function WithdrawalTable({ requests: initialRequests }: { requests: WithdrawalRequest[] }) {
  const [requests, setRequests] = useState<WithdrawalRequest[]>(initialRequests);
  const { toast } = useToast();

  const handleStatusChange = (id: string, status: 'Approved' | 'Rejected') => {
    setRequests(currentRequests =>
      currentRequests.map(req =>
        req.id === id ? { ...req, status: status } : req
      )
    );
    toast({
      title: `Request ${status}`,
      description: `The withdrawal request has been ${status.toLowerCase()}.`,
    });
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <Link href={`/drivers/${request.driverId}`} className="flex items-center gap-3 hover:underline">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={request.driverAvatarUrl} alt={request.driverName} />
                    <AvatarFallback>{request.driverName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{request.driverName}</span>
                </Link>
              </TableCell>
              <TableCell>${request.amount.toFixed(2)}</TableCell>
              <TableCell>
                <FormattedDate date={parseISO(request.requestDate)} />
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={statusVariantMap[request.status]}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {request.status === 'Pending' ? (
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleStatusChange(request.id, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(request.id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
