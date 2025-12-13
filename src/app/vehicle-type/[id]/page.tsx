
import { getVehicleTypeById } from "@/lib/data";
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

export default function VehicleTypeDetailPage({ params }: { params: { id: string } }) {
  const vehicleType = getVehicleTypeById(params.id);

  if (!vehicleType) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={vehicleType.type}
        description={`Details for vehicle type ${vehicleType.type}.`}
        actions={
          <Link href="/vehicle-type" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Vehicle Types
            </Button>
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Type Details</CardTitle>
          <CardDescription>
            All information related to the vehicle type.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <p>{vehicleType.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Localization</p>
              <p>{vehicleType.localization}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Price Per KMs</p>
              <p>$ {vehicleType.pricePerKms.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Price Per Min</p>
              <p>$ {vehicleType.pricePerMin.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Base Fare</p>
              <p>$ {vehicleType.baseFare.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Commission</p>
              <p>{vehicleType.commission}%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Person Capacity</p>
              <p>{vehicleType.personCapacity}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Display Order</p>
              <p>{vehicleType.displayOrder}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={vehicleType.status === 'Active' ? 'default' : 'secondary'}>{vehicleType.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
