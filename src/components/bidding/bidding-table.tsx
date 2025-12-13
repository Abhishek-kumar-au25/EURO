"use client";

import { useState } from "react";
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
import type { TripBid } from "@/lib/types";
import { parseISO } from "date-fns";
import { RelativeTime } from "../relative-time";

const statusVariantMap: Record<TripBid["status"], "info" | "success" | "destructive"> = {
  Pending: "info",
  Accepted: "success",
  Rejected: "destructive",
};

export function BiddingTable({ tripBids: initialBids }: { tripBids: TripBid[] }) {
  const [bids, setBids] = useState<TripBid[]>(initialBids);
  const { toast } = useToast();

  const handleBidAction = (bidId: string, tripId: string, newStatus: "Accepted" | "Rejected") => {
    setBids(currentBids => {
      // Find the bid being actioned
      const actedBid = currentBids.find(b => b.id === bidId);
      if (!actedBid) return currentBids;
      
      // Update the status of all bids for the same trip
      const updatedBids = currentBids.map(bid => {
        if (bid.tripId === tripId) {
          if (bid.id === bidId) {
            // This is the bid that was accepted
            return { ...bid, status: newStatus };
          } else {
            // Other bids for the same trip are automatically rejected if one is accepted
            return { ...bid, status: 'Rejected' };
          }
        }
        return bid;
      });

      toast({
        title: `Bid ${newStatus}`,
        description: `Bid from ${actedBid.driverName} has been ${newStatus.toLowerCase()}.`,
      });

      return updatedBids;
    });
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Bid Amount</TableHead>
            <TableHead>Bid Time</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bids.map((bid) => (
            <TableRow key={bid.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={bid.driverAvatarUrl} alt={bid.driverName} />
                    <AvatarFallback>{bid.driverName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{bid.driverName}</span>
                </div>
              </TableCell>
              <TableCell>{bid.userName}</TableCell>
              <TableCell>${bid.bidAmount.toFixed(2)}</TableCell>
              <TableCell>
                <RelativeTime date={parseISO(bid.bidTime)} />
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={statusVariantMap[bid.status]}>
                  {bid.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {bid.status === "Pending" ? (
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleBidAction(bid.id, bid.tripId, 'Accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleBidAction(bid.id, bid.tripId, 'Rejected')}
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
