
import PageHeader from "@/components/page-header";
import { DriversTable } from "@/components/drivers/drivers-table";
import { drivers } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const pendingDrivers = drivers.filter(driver => driver.status === 'Pending');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Pending Drivers"
        description="Review and approve new driver applications."
        actions={
          <>
            <Button variant="outline">Approve All</Button>
            <Button variant="destructive">Reject All</Button>
          </>
        }
      />
      <DriversTable drivers={pendingDrivers} />
    </div>
  );
}
