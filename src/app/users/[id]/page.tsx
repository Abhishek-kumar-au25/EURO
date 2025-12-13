
'use client';

import { notFound, useParams } from "next/navigation";
import { getUserById } from "@/lib/data";
import type { User } from "@/lib/types";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, DollarSign, Edit, FileCheck, Landmark, RefreshCw, ShieldCheck, Trash2, Ban } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import StatCard from '@/components/stat-card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { FormattedDate } from '@/components/formatted-date';
import { parseISO } from 'date-fns';
import { useState } from 'react';

const statusVariantMap: Record<User['status'], 'success' | 'warning' | 'destructive'> = {
  Active: 'success',
  Suspended: 'destructive',
  Flagged: 'warning',
};


export default function UserDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialUser = getUserById(id);
  
  const [user, setUser] = useState<User | null>(initialUser || null);
  const { toast } = useToast();

  if (!user) {
    notFound();
  }
  
  const handleStatusChange = (newStatus: User['status']) => {
    setUser({ ...user, status: newStatus });
    toast({
      title: `User ${newStatus}`,
      description: `${user.name}'s status has been updated.`,
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={user.name}
        description={`Manage profile and activity for ${user.name}.`}
        actions={
          <Link href="/users" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Badge variant={statusVariantMap[user.status]} className="mt-2">{user.status}</Badge>
            </CardHeader>
             <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center justify-between">
                        <span>User ID</span>
                        <span className="font-mono text-foreground">{user.id}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span>Signed Up</span>
                        <span><FormattedDate date={parseISO(user.signupDate)} /></span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Last Trip</span>
                        <span><FormattedDate date={parseISO(user.lastTripDate)} /></span>
                    </div>
                </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
                {user.status === 'Active' && <Button variant="outline" onClick={() => handleStatusChange('Suspended')}><Ban className="mr-2"/>Suspend</Button>}
                {user.status === 'Suspended' && <Button variant="outline" onClick={() => handleStatusChange('Active')}><RefreshCw className="mr-2"/>Reactivate</Button>}
                {user.status === 'Flagged' && <Button variant="outline" onClick={() => handleStatusChange('Active')}><ShieldCheck className="mr-2"/>Unflag</Button>}

                <Button variant="secondary"><RefreshCw className="mr-2"/>Reset Password</Button>
                <Button variant="secondary"><Edit className="mr-2"/>Update KYC</Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="col-span-2">
                      <Trash2 className="mr-2" />
                      Delete User
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the user account and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => { /* Handle deletion */ }}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </CardContent>
           </Card>

        </div>
        <div className="md:col-span-2 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <StatCard title="Total Trips" value={user.totalTrips.toString()} icon={<Car />} />
                <StatCard title="Total Spent" value={`$${user.totalSpent.toFixed(2)}`} icon={<DollarSign />} />
                <StatCard title="Wallet Balance" value={`$${user.walletBalance.toFixed(2)}`} icon={<Landmark />} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Ride History</CardTitle>
                    <CardDescription>A summary of the user's recent trips.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Ride history feature is under development.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Verification</CardTitle>
                    <CardDescription>KYC and identity verification status.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                     <FileCheck className="h-8 w-8 text-green-500" />
                     <div>
                        <p className="font-semibold">KYC Verified</p>
                        <p className="text-sm text-muted-foreground">User has completed identity verification.</p>
                     </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
