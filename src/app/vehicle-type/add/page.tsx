import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddVehicleTypePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Vehicle Type"
        actions={
          <Link href="/vehicle-type" passHref>
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              BACK TO LISTING
            </Button>
          </Link>
        }
      />
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle-type">
                Vehicle Type <span className="text-red-500">*</span>
              </Label>
              <Input id="vehicle-type" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-type-name-rental">
                Vehicle Type Name For Rental <span className="text-red-500">*</span>
              </Label>
              <Input id="vehicle-type-name-rental" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-type-info" className="flex items-center">
                Vehicle Type Info <Info className="ml-1 h-3 w-3" />
              </Label>
              <Textarea id="vehicle-type-info" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-category" className="flex items-center">
                Vehicle Category / Map Icon Type{" "}
                <Info className="ml-1 h-3 w-3" />
              </Label>
              <Select>
                <SelectTrigger id="vehicle-category">
                  <SelectValue placeholder="Car" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pool-ride" className="flex items-center">
                Enable Pool - Shared Ride <Info className="ml-1 h-3 w-3" />
              </Label>
              <Switch id="pool-ride" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="wheel-chair" className="flex items-center">
                Wheel Chair (Access) available?
              </Label>
              <Switch id="wheel-chair" />
            </div>
            <div className="flex justify-end gap-2">
                 <Button variant="outline">Cancel</Button>
                 <Button>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
