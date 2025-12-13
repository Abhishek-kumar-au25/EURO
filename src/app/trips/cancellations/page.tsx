
'use client';

import PageHeader from "@/components/page-header";
import { CancellationsTable } from "@/components/trips/cancellations-table";
import { rides } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";

export default function CancellationsPage() {
  const cancelledRides = rides.filter(ride => ride.status === 'Cancelled');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Cancellation Reasons"
        description="Review cancellation reasons from users and drivers."
      />
       <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
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
      <CancellationsTable rides={cancelledRides} />
    </div>
  );
}
