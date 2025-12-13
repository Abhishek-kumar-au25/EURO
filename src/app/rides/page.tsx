'use client';

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
import { rides } from "@/lib/data";
import { RidesTable } from "@/components/rides/rides-table";
import { DateRangePicker } from "@/components/date-range-picker";


export default function AllRidesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="All Rides"
        description="View and manage all rides in the system."
      />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
             <Input placeholder="Search by user, driver, or location..." className="w-full md:flex-1" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker className="w-full md:w-auto" />
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="w-1/2 md:w-auto">
                SEARCH
              </Button>
              <Button variant="ghost" className="w-1/2 md:w-auto">
                RESET
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <RidesTable rides={rides} />
    </div>
  );
}
