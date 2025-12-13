
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FailedBookingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Failed Booking Attempts"
        description="Review and analyze failed booking attempts."
      />
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>
            This page is currently under development. Check back later for analysis of failed bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Future features will include logs of failed booking attempts with error details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
