import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { vehicleTypes } from "@/lib/data";
import { VehicleTypeTable } from "@/components/vehicle-type/vehicle-type-table";
import Link from "next/link";

export default function VehicleTypePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Vehicle Type" />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-sm font-medium">Search:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[120px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Search..." className="w-full md:flex-1" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="w-1/2 md:w-auto">
                SEARCH
              </Button>
              <Button variant="ghost" className="w-1/2 md:w-auto">
                RESET
              </Button>
            </div>
            <Link href="/vehicle-type/add" passHref>
              <Button className="w-full md:w-auto">
                ADD VEHICLE TYPE
              </Button>
            </Link>
          </div>
          <div className="flex items-center">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activate">Activate</SelectItem>
                <SelectItem value="deactivate">Deactivate</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <VehicleTypeTable vehicleTypes={vehicleTypes} />
    </div>
  );
}
