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
import { Checkbox } from "@/components/ui/checkbox";
import type { Driver } from "@/lib/types";
import { parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { FilePen, MoreHorizontal, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Badge } from "@/components/ui/badge";
import { FormattedDate } from "../formatted-date";

const statusVariantMap: Record<Driver['status'], 'success' | 'info' | 'destructive' | 'warning'> = {
  Approved: 'success',
  Pending: 'info',
  Rejected: 'destructive',
  Suspended: 'warning',
};

export function DriversTable({ drivers: initialDrivers }: { drivers: Driver[] }) {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = () => {
    if (itemToDelete) {
      setDrivers(drivers.filter((driver) => driver.id !== itemToDelete));
      toast({
        title: 'Driver Deleted',
        description: `The driver has been successfully deleted.`,
      });
      setItemToDelete(null);
    }
  };
  
  const getStatusText = (status: Driver['status']) => {
    if (status === 'Rejected') {
      return 'Failed';
    }
    return status;
  }


  return (
    <>
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
                <Checkbox />
            </TableHead>
            <TableHead>Driver Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Signup Date</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Wallet Balance</TableHead>
            <TableHead>Total Trips</TableHead>
            <TableHead className="text-center">View/Edit Document(s)</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Link href={`/drivers/${driver.id}`} className="font-medium text-blue-600 hover:underline">
                    {driver.name}
                </Link>
              </TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>
                <div className="whitespace-nowrap">
                  <FormattedDate date={parseISO(driver.joinDate)} />
                </div>
              </TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>
                <div>{`$ ${driver.walletBalance.toFixed(2)}`}</div>
              </TableCell>
              <TableCell>{driver.performance.trips}</TableCell>
              <TableCell className="text-center">
                <Link href={`/drivers/${driver.id}`}>
                  <Button variant="ghost" size="icon">
                    <FilePen className="h-5 w-5" />
                  </Button>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={statusVariantMap[driver.status]}>{getStatusText(driver.status)}</Badge>
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
                    <DropdownMenuItem onClick={() => window.location.assign(`/drivers/${driver.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setItemToDelete(driver.id)}
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
    <AlertDialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the driver.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
