
import PageHeader from "@/components/page-header";
import { DriversTable } from "@/components/drivers/drivers-table";
import { drivers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function AllDriversPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Manage Driver"
      />
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
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Search..." className="w-full md:flex-1" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="w-1/2 md:w-auto">SEARCH</Button>
              <Button variant="ghost" className="w-1/2 md_w-auto">RESET</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
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
            <Button variant="outline">EXPORT</Button>
          </div>
        </CardContent>
      </Card>
      <DriversTable drivers={drivers} />
    </div>
  );
}
