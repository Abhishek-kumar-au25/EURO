
import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Award } from "lucide-react";
import Image from "next/image";

function RewardCard({
  level,
  icon,
  badgeColor,
  headerColor,
  defaultValues,
}: {
  level: string;
  icon: string;
  badgeColor: string;
  headerColor: string;
  defaultValues: {
    minTrips: string;
    ratings: string;
    cancellationRate: string;
    acceptanceRate: string;
  };
}) {
  return (
    <Card>
      <CardHeader className={`p-3 ${headerColor} rounded-t-lg`}>
        <div className="flex items-center gap-2 text-white">
          <Award className="h-5 w-5" />
          <h3 className="font-semibold">{level}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <Image
            src={icon}
            alt={`${level} Level`}
            width={150}
            height={150}
            className="rounded-full"
            data-ai-hint={`${level} medal`}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${level.toLowerCase()}-level`}>
              Level <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`${level.toLowerCase()}-level`}
              value={level}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${level.toLowerCase()}-status`}>Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id={`${level.toLowerCase()}-status`}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${level.toLowerCase()}-min-trips`}>
              Minimum Trips
            </Label>
            <Input
              id={`${level.toLowerCase()}-min-trips`}
              defaultValue={defaultValues.minTrips}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${level.toLowerCase()}-ratings`}>Ratings</Label>
            <Input
              id={`${level.toLowerCase()}-ratings`}
              defaultValue={defaultValues.ratings}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${level.toLowerCase()}-cancellation`}>
              Cancellation Rate
            </Label>
            <div className="relative">
              <Input
                id={`${level.toLowerCase()}-cancellation`}
                defaultValue={defaultValues.cancellationRate}
                className="pr-8"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                %
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${level.toLowerCase()}-acceptance`}>
              Acceptance Rate
            </Label>
            <div className="relative">
              <Input
                id={`${level.toLowerCase()}-acceptance`}
                defaultValue={defaultValues.acceptanceRate}
                className="pr-8"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DriverRewardsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Reward Setting"
        actions={
          <div className="text-sm font-medium">
            Active Campaign: <span className="font-bold">Super reward</span>
          </div>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RewardCard
          level="Bronze"
          icon="https://picsum.photos/seed/bronze-medal/150/150"
          badgeColor="bg-orange-400"
          headerColor="bg-blue-500"
          defaultValues={{
            minTrips: "10",
            ratings: "3.50",
            cancellationRate: "40",
            acceptanceRate: "60",
          }}
        />
        <RewardCard
          level="Silver"
          icon="https://picsum.photos/seed/silver-medal/150/150"
          badgeColor="bg-gray-400"
          headerColor="bg-blue-500"
          defaultValues={{
            minTrips: "13",
            ratings: "4.00",
            cancellationRate: "30",
            acceptanceRate: "70",
          }}
        />
        <RewardCard
          level="Gold"
          icon="https://picsum.photos/seed/gold-medal/150/150"
          badgeColor="bg-yellow-400"
          headerColor="bg-blue-500"
          defaultValues={{
            minTrips: "15",
            ratings: "4.50",
            cancellationRate: "20",
            acceptanceRate: "80",
          }}
        />
      </div>
    </div>
  );
}
