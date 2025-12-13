
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
import { Car, CarFront, Users, FileEdit, DollarSign, Zap } from "lucide-react";

const serviceCategories = [
  {
    name: "Basic",
    icon: <Car className="h-10 w-10 text-gray-500" />,
    enabled: true,
  },
  {
    name: "SUV",
    icon: <CarFront className="h-10 w-10 text-gray-500" />,
    enabled: true,
  },
  {
    name: "Luxurious",
    icon: <Car className="h-10 w-10 text-yellow-500" />,
    enabled: true,
  },
    {
    name: "Electric",
    icon: <Zap className="h-10 w-10 text-green-500" />,
    enabled: true,
  },
  {
    name: "Bid for Taxi",
    icon: <DollarSign className="h-10 w-10 text-blue-500" />,
    enabled: true,
  },
  {
    name: "Taxi Pool",
    icon: <Users className="h-10 w-10 text-purple-500" />,
    enabled: true,
  },
];

export default function ServiceCategoryPage() {
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((category) => (
          <Card key={category.name}>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {category.icon}
                  </div>
                  <p className="font-medium">{category.name}</p>
                </div>
                <Switch defaultChecked={category.enabled} />
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon">
                  <FileEdit className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
