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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from "../ui/button";
import { MoreHorizontal, Eye, Ban } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


const statusVariantMap: Record<Ride['status'], 'info' | 'success' | 'destructive' | 'default'> = {
  Upcoming: 'info',
  Ongoing: 'default',
  Completed: 'success',
  Cancelled: 'destructive',
};

export function RidesTable({ rides: initialRides }: { rides: Ride[] }) {
  const [rides, setRides] = useState(initialRides);
  const [rideToCancel, setRideToCancel] = useState<Ride | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleCancelRide = () => {
    if (rideToCancel) {
      setRides(rides.map(r => r.id === rideToCancel.id ? { ...r, status: 'Cancelled', cancelledBy: 'User', cancellationReason: 'Cancelled by admin' } : r));
      toast({
        title: "Ride Cancelled",
        description: `Ride ${rideToCancel.id} has been cancelled.`
      });
      setRideToCancel(null);
    }
  };

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Dropoff</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow key={ride.id}>
                <TableCell className="font-medium">{ride.userName}</TableCell>
                <TableCell>{ride.driverName}</TableCell>
                <TableCell>
                  <FormattedDate date={parseISO(ride.rideDate)} formatString="dd MMM, yyyy HH:mm"/>
                </TableCell>
                <TableCell>{ride.pickupLocation}</TableCell>
                <TableCell>{ride.dropoffLocation}</TableCell>
                <TableCell>${ride.fare.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[ride.status]}>{ride.status}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/rides/${ride.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {ride.status === 'Upcoming' && (
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setRideToCancel(ride)} className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Cancel Ride
                          </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       <AlertDialog open={!!rideToCancel} onOpenChange={() => setRideToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel this ride?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelRide} className="bg-destructive hover:bg-destructive/90">
              Confirm Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
