'use client';

import { getDriverById } from "@/lib/data";
import { notFound, useParams } from "next/navigation";
import PageHeader from "@/components/page-header";
import { DriverProfile } from "@/components/drivers/driver-profile";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Driver } from "@/lib/types";

export default function DriverDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const driver = getDriverById(id);

  if (!driver) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={driver.name}
        description={`Manage profile, documents, and inquiries for ${driver.name}.`}
        actions={
          <Link href="/drivers" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Drivers
            </Button>
          </Link>
        }
      />
      {driver.status === 'Rejected' && driver.rejectionReason && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>{driver.rejectionReason}</AlertDescription>
        </Alert>
      )}
      <DriverProfile driver={driver} />
    </div>
  );
}
