
import { getVehicleById } from "@/lib/data";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={vehicle.name}
        description={`Details for vehicle ${vehicle.name}.`}
        actions={
          <Link href="/drivers/vehicles" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Vehicles
            </Button>
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>
            All information related to the vehicle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Vehicle Name</p>
              <p>{vehicle.name}</p>
            </div>
             <div>
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p>{vehicle.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Driver</p>
              <p>{vehicle.driver}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={vehicle.status === 'Approved' ? 'default' : 'secondary'}>{vehicle.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
