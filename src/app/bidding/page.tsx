
import PageHeader from "@/components/page-header";
import { BiddingTable } from "@/components/bidding/bidding-table";
import { tripBids } from "@/lib/data";

export default function BiddingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Bidding Monitor"
        description="Track and manage ongoing reverse bids from drivers."
      />
      <BiddingTable tripBids={tripBids} />
    </div>
  );
}
