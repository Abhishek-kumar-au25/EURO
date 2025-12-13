
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
import type { VehicleType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, MoreHorizontal, ArrowUpDown, Eye, Trash2 } from "lucide-react";
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

export function VehicleTypeTable({
  vehicleTypes: initialVehicleTypes,
}: {
  vehicleTypes: VehicleType[];
}) {
  const [vehicleTypes, setVehicleTypes] = useState(initialVehicleTypes);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = () => {
    if (itemToDelete) {
      setVehicleTypes(vehicleTypes.filter((vt) => vt.id !== itemToDelete));
      toast({
        title: 'Vehicle Type Deleted',
        description: `The vehicle type has been successfully deleted.`,
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
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Localization
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Price Per KMs
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Price Per Min
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Base Fare</TableHead>
            <TableHead>Commission (%)</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Person Capacity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Display Order
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicleTypes.map((vehicleType) => (
            <TableRow key={vehicleType.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{vehicleType.type}</TableCell>
              <TableCell>{vehicleType.localization}</TableCell>
              <TableCell>$ {vehicleType.pricePerKms.toFixed(2)}</TableCell>
              <TableCell>$ {vehicleType.pricePerMin.toFixed(2)}</TableCell>
              <TableCell>$ {vehicleType.baseFare.toFixed(2)}</TableCell>
              <TableCell>{vehicleType.commission}</TableCell>
              <TableCell>{vehicleType.personCapacity}</TableCell>
              <TableCell>{vehicleType.displayOrder}</TableCell>
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
                    <DropdownMenuItem onClick={() => router.push(`/vehicle-type/${vehicleType.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setItemToDelete(vehicleType.id)}
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
            This action cannot be undone. This will permanently delete the vehicle type.
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
