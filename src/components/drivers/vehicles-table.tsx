
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Vehicle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FilePen, CheckCircle, MoreHorizontal, Eye, Trash2 } from "lucide-react";
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
import { useRouter } from 'next/navigation';

export function VehiclesTable({ vehicles: initialVehicles }: { vehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = () => {
    if (itemToDelete) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== itemToDelete));
      toast({
        title: 'Vehicle Deleted',
        description: `The vehicle has been successfully deleted.`,
      });
      setItemToDelete(null);
    }
  };
  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                  <Checkbox />
              </TableHead>
              <TableHead>Vehicles</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="text-center">View/Edit Document(s)</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.name}</div>
                </TableCell>
                <TableCell>{vehicle.company}</TableCell>
                <TableCell>{vehicle.driver}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon">
                    <FilePen className="h-5 w-5" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="text-green-500">
                    <CheckCircle className="h-5 w-5" />
                  </Button>
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
                      <DropdownMenuItem onClick={() => router.push(`/drivers/vehicles/${vehicle.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setItemToDelete(vehicle.id)}
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
              This action cannot be undone. This will permanently delete the vehicle.
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
