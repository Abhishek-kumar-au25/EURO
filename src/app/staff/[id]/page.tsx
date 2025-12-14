
'use client';

import { notFound, useParams } from "next/navigation";
import { getStaffById } from "@/lib/data";
import type { Staff } from "@/lib/types";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Ban, RefreshCw, KeyRound, ShieldCheck } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

const statusVariantMap: Record<Staff['status'], 'success' | 'secondary'> = {
  Active: 'success',
  Inactive: 'secondary',
};

const roleVariantMap: Record<Staff['role'], 'default' | 'secondary' | 'outline'> = {
    Admin: 'default',
    Manager: 'secondary',
    Support: 'outline'
}


export default function StaffDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialStaff = getStaffById(id);
  
  const [staff, setStaff] = useState<Staff | null>(initialStaff || null);
  const { toast } = useToast();

  if (!staff) {
    notFound();
  }
  
  const handleStatusChange = (newStatus: Staff['status']) => {
    setStaff({ ...staff, status: newStatus });
    toast({
      title: `Staff Status Updated`,
      description: `${staff.name}'s status has been changed to ${newStatus}.`,
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={staff.name}
        description={`Manage profile and permissions for ${staff.name}.`}
        actions={
          <Link href="/staff" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Staff List
            </Button>
          </Link>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={staff.avatarUrl} alt={staff.name} />
                <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{staff.name}</CardTitle>
              <CardDescription>{staff.email}</CardDescription>
              <div className="flex gap-2 pt-2">
                <Badge variant={statusVariantMap[staff.status]}>{staff.status}</Badge>
                <Badge variant={roleVariantMap[staff.role]}>{staff.role}</Badge>
              </div>
            </CardHeader>
             <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center justify-between">
                        <span>Staff ID</span>
                        <span className="font-mono text-foreground">{staff.id}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span>Join Date</span>
                        <span><FormattedDate date={parseISO(staff.joinDate)} /></span>
                    </div>
                </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
                {staff.status === 'Active' ? 
                    <Button variant="outline" onClick={() => handleStatusChange('Inactive')}><Ban className="mr-2"/>Deactivate</Button>
                    :
                    <Button variant="outline" onClick={() => handleStatusChange('Active')}><RefreshCw className="mr-2"/>Reactivate</Button>
                }

                <Button variant="secondary"><KeyRound className="mr-2"/>Reset Password</Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="col-span-2">
                      <Trash2 className="mr-2" />
                      Delete Staff Member
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the staff member's account.
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
            <Card>
                <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>Review and manage what this staff member can do.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {staff.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span className="text-sm">{permission}</span>
                        </div>
                    ))}
                    <Separator className="my-4"/>
                    <Button variant="outline"><Edit className="mr-2"/>Edit Permissions</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
