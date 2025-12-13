
'use client';
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { coupons } from "@/lib/data";
import { CouponsTable } from "@/components/coupons/coupons-table";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Coupon } from "@/lib/types";

export default function CouponsPage() {
  const [couponList, setCouponList] = useState<Coupon[]>(coupons);
  const [newCoupon, setNewCoupon] = useState({ promoCode: '', discount: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveCoupon = () => {
    if (newCoupon.promoCode && newCoupon.discount) {
      const newCouponData: Coupon = {
        id: `C${(couponList.length + 1).toString().padStart(3, '0')}`,
        promoCode: newCoupon.promoCode,
        discount: `${newCoupon.discount}%`,
        validity: 'Permanent',
        promoCodeType: 'Public',
        activationDate: null,
        expiryDate: null,
        usageLimit: 100,
        used: 0,
        usedInScheduleBooking: 0,
        status: 'Active',
      };
      setCouponList([...couponList, newCouponData]);
      setNewCoupon({ promoCode: '', discount: '' });
      setIsDialogOpen(false);
    }
  };


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="PromoCode" />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-sm font-medium">Search:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[120px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Search..." className="w-full md:flex-1" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="w-1/2 md:w-auto">
                SEARCH
              </Button>
              <Button variant="ghost" className="w-1/2 md:w-auto">
                RESET
              </Button>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  ADD PROMO CODE
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Promo Code</DialogTitle>
                  <DialogDescription>
                    Create a new promo code by providing a code and discount percentage.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="promo-code" className="text-right">
                      Promo Code
                    </Label>
                    <Input id="promo-code" value={newCoupon.promoCode} onChange={(e) => setNewCoupon({...newCoupon, promoCode: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discount" className="text-right">
                      Discount %
                    </Label>
                    <Input id="discount" type="number" value={newCoupon.discount} onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleSaveCoupon}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center justify-between">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activate">Activate</SelectItem>
                <SelectItem value="deactivate">Deactivate</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">EXPORT</Button>
          </div>
        </CardContent>
      </Card>
      <CouponsTable coupons={couponList} />
      <Card>
        <CardHeader>
          <CardTitle>Notes:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Coupon module will list all coupons on this page.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
