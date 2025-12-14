
'use client';

import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Car, CarFront, Users, FileEdit, DollarSign, Zap, Truck, Bike } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const iconComponents: { [key: string]: React.FC<any> } = {
  Car,
  CarFront,
  Users,
  DollarSign,
  Zap,
  Truck,
  Bike,
};

const initialServiceCategories = [
  {
    id: "basic",
    name: "Basic",
    iconName: "Car",
    iconColor: "text-gray-500",
    enabled: true,
  },
  {
    id: "suv",
    name: "SUV",
    iconName: "CarFront",
    iconColor: "text-gray-500",
    enabled: true,
  },
  {
    id: "luxurious",
    name: "Luxurious",
    iconName: "Car",
    iconColor: "text-yellow-500",
    enabled: true,
  },
  {
    id: "electric",
    name: "Electric",
    iconName: "Zap",
    iconColor: "text-green-500",
    enabled: true,
  },
  {
    id: "bid",
    name: "Bid for Taxi",
    iconName: "DollarSign",
    iconColor: "text-blue-500",
    enabled: true,
  },
  {
    id: "pool",
    name: "Taxi Pool",
    iconName: "Users",
    iconColor: "text-purple-500",
    enabled: true,
  },
];

type ServiceCategory = typeof initialServiceCategories[0];

const CategoryIcon = ({ name, color }: { name: string, color: string }) => {
    const IconComponent = iconComponents[name];
    if (!IconComponent) return <Car className={`h-10 w-10 ${color}`} />;
    return <IconComponent className={`h-10 w-10 ${color}`} />;
};


export default function ServiceCategoryPage() {
  const [serviceCategories, setServiceCategories] = useState(initialServiceCategories);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const { toast } = useToast();

  const handleUpdateCategory = () => {
    if (editingCategory) {
      setServiceCategories(
        serviceCategories.map((c) =>
          c.id === editingCategory.id ? editingCategory : c
        )
      );
      toast({
        title: "Category Updated",
        description: `${editingCategory.name} has been updated.`,
      });
      setEditingCategory(null);
    }
  };

  const handleToggle = (categoryId: string, enabled: boolean) => {
    setServiceCategories(
      serviceCategories.map((c) =>
        c.id === categoryId ? { ...c, enabled } : c
      )
    );
  };


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Service Category (Taxi Service)" />
       <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Search:</span>
            <Input placeholder="Search..." className="w-full md:w-[200px]" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">SEARCH</Button>
            <Button variant="ghost">RESET</Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!editingCategory} onOpenChange={(isOpen) => !isOpen && setEditingCategory(null)}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-card-foreground/5 rounded-md">
                      <CategoryIcon name={category.iconName} color={category.iconColor} />
                    </div>
                    <p className="font-medium">{category.name}</p>
                  </div>
                  <Switch checked={category.enabled} onCheckedChange={(checked) => handleToggle(category.id, checked)} />
                </div>
                <div className="flex justify-end">
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setEditingCategory({...category})}>
                      <FileEdit className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {editingCategory && (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Service Category</DialogTitle>
                    <DialogDescription>
                        Update the details for the {editingCategory.name} category.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input 
                            id="category-name" 
                            value={editingCategory.name} 
                            onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="category-icon">Icon</Label>
                        <Select
                            value={editingCategory.iconName}
                            onValueChange={(value) => setEditingCategory({ ...editingCategory, iconName: value })}
                        >
                            <SelectTrigger id="category-icon">
                                <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Car">Car</SelectItem>
                                <SelectItem value="CarFront">SUV</SelectItem>
                                <SelectItem value="Truck">Truck</SelectItem>
                                <SelectItem value="Bike">Bike</SelectItem>
                                <SelectItem value="Users">Pool</SelectItem>
                                <SelectItem value="Zap">Electric</SelectItem>
                                <SelectItem value="DollarSign">Bid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                         <Label htmlFor="category-status">Status</Label>
                         <Switch 
                            id="category-status" 
                            checked={editingCategory.enabled} 
                            onCheckedChange={(checked) => setEditingCategory({...editingCategory, enabled: checked})}
                         />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleUpdateCategory}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
