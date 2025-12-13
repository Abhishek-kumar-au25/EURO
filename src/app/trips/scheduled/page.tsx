
import PageHeader from "@/components/page-header";
import { rides } from "@/lib/data";
import { RidesTable } from "@/components/rides/rides-table";

export default function ScheduledRidesPage() {
  const scheduledRides = rides.filter(ride => ride.status === 'Upcoming');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Scheduled Rides"
        description="Manage upcoming scheduled rides."
      />
      <RidesTable rides={scheduledRides} />
    </div>
  );
}
