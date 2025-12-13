
import PageHeader from "@/components/page-header";
import { withdrawalRequests } from "@/lib/data";
import { WithdrawalTable } from "@/components/withdrawal/withdrawal-table";

export default function DriverPayoutsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Driver Payouts"
        description="View driver earnings and manage payouts."
      />
      <WithdrawalTable requests={withdrawalRequests} />
    </div>
  );
}
