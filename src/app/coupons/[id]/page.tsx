"use client";

import { notFound, useParams } from "next/navigation";
import { getCouponById } from "@/lib/data";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CouponDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const coupon = getCouponById(id);

  if (!coupon) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={`Coupon: ${coupon.promoCode}`}
        description="View details for this promo code."
        actions={
          <Link href="/coupons" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Coupons
            </Button>
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Coupon Details</CardTitle>
          <CardDescription>
            All information related to the promo code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Promo Code</p>
              <p>{coupon.promoCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Discount</p>
              <p>{coupon.discount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={coupon.status === 'Active' ? 'default' : 'secondary'}>{coupon.status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <p>{coupon.promoCodeType}</p>
            </div>
             <div>
              <p className="text-sm font-medium text-muted-foreground">Usage Limit</p>
              <p>{coupon.usageLimit}</p>
            </div>
             <div>
              <p className="text-sm font-medium text-muted-foreground">Used</p>
              <p>{coupon.used}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
