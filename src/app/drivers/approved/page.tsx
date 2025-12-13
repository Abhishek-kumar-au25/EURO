
import PageHeader from "@/components/page-header";
import { DriversTable } from "@/components/drivers/drivers-table";
import { drivers } from "@/lib/data";

export default function ApprovedDriversPage() {
  const approvedDrivers = drivers.filter(driver => driver.status === 'Approved');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Approved Drivers"
        description="Manage all approved drivers."
      />
      <DriversTable drivers={approvedDrivers} />
    </div>
  );
}
