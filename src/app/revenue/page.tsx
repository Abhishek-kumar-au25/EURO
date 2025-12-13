
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RevenuePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Revenue"
        description="Monitor revenue and earnings."
      />
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>
            This page is currently under development. Check back later for revenue and payout management features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Future features will include detailed revenue reports, earnings breakdowns, and tools to manage and process driver payouts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
