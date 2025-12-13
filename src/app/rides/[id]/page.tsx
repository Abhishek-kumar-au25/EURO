
'use client';

import { getRideById } from "@/lib/data";
import { notFound, useParams } from "next/navigation";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, User, Calendar, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormattedDate } from "@/components/formatted-date";
import { parseISO } from "date-fns";
import type { Ride } from "@/lib/types";

const statusVariantMap: Record<Ride['status'], 'info' | 'success' | 'destructive' | 'default'> = {
  Upcoming: 'info',
  Ongoing: 'default',
  Completed: 'success',
  Cancelled: 'destructive',
};

export default function RideDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const ride = getRideById(id);

  if (!ride) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={`Ride Details: ${ride.id}`}
        description="View all information related to this ride."
        actions={
          <Link href="/rides" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Rides
            </Button>
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Trip Information</CardTitle>
              <CardDescription>
                <FormattedDate date={parseISO(ride.rideDate)} formatString="eeee, dd MMMM yyyy 'at' HH:mm" />
              </CardDescription>
            </div>
            <Badge variant={statusVariantMap[ride.status]} className="text-base">
              {ride.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Rider</p>
                <p className="font-semibold">{ride.userName}</p>
              </div>
            </div>
            
            {/* Driver Info */}
            <div className="flex items-center gap-4">
              <Car className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Driver</p>
                <p className="font-semibold">{ride.driverName}</p>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup Location</p>
                <p className="font-semibold">{ride.pickupLocation}</p>
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Dropoff Location</p>
                <p className="font-semibold">{ride.dropoffLocation}</p>
              </div>
            </div>

             {/* Fare */}
            <div className="flex items-center gap-4">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fare</p>
                <p className="font-semibold">${ride.fare.toFixed(2)}</p>
              </div>
            </div>

            {ride.status === 'Cancelled' && ride.cancelledBy && (
              <div className="flex items-center gap-4">
                <Badge variant="destructive" className="h-8 w-8 items-center justify-center">
                    <Ban className="h-4 w-4" />
                </Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Cancelled By {ride.cancelledBy}</p>
                  <p className="font-semibold">{ride.cancellationReason}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
