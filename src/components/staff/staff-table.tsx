
'use client';

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Staff } from "@/lib/types";
import { parseISO } from "date-fns";
import { FormattedDate } from "../formatted-date";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from "../ui/button";
import { MoreHorizontal, Eye, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const statusVariantMap: Record<Staff['status'], 'success' | 'secondary'> = {
  Active: 'success',
  Inactive: 'secondary',
};

const roleVariantMap: Record<Staff['role'], 'default' | 'secondary' | 'outline'> = {
    Admin: 'default',
    Manager: 'secondary',
    Support: 'outline'
}

interface StaffTableProps {
    staff: Staff[];
    onEdit: (staff: Staff) => void;
}

export function StaffTable({ staff, onEdit }: StaffTableProps) {
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);
  const { toast } = useToast();

  const handleDeleteConfirm = () => {
    if (deletingStaff) {
      // In a real app, you'd call an API here.
      // For now, we'll just show a toast.
      toast({
        title: 'Staff Member Deleted',
        description: `${deletingStaff.name} has been notionally deleted.`,
      });
      setDeletingStaff(null);
    }
  };
  
  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Link href={`/staff/${member.id}`} className="flex items-center gap-3 hover:underline">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                    <Badge variant={roleVariantMap[member.role]}>{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <FormattedDate date={parseISO(member.joinDate)} />
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[member.status]}>{member.status}</Badge>
                </TableCell>
                 <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => window.location.assign(`/staff/${member.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(member)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingStaff(member)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

       <AlertDialog open={!!deletingStaff} onOpenChange={() => setDeletingStaff(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff member's account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
