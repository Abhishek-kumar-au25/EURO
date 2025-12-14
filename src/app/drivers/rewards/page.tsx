
'use client';

import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Award, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type RewardLevel = {
  id: string;
  level: string;
  badgeColor: string;
  headerColor: string;
  status: 'active' | 'inactive';
  minTrips: string;
  ratings: string;
  cancellationRate: string;
  acceptanceRate: string;
};

const initialRewardLevels: RewardLevel[] = [
  {
    id: 'bronze',
    level: 'Bronze',
    badgeColor: 'bg-orange-400',
    headerColor: 'bg-blue-500',
    status: 'active',
    minTrips: '10',
    ratings: '3.50',
    cancellationRate: '40',
    acceptanceRate: '60',
  },
  {
    id: 'silver',
    level: 'Silver',
    badgeColor: 'bg-gray-400',
    headerColor: 'bg-blue-500',
    status: 'active',
    minTrips: '25',
    ratings: '4.00',
    cancellationRate: '30',
    acceptanceRate: '70',
  },
  {
    id: 'gold',
    level: 'Gold',
    badgeColor: 'bg-yellow-400',
    headerColor: 'bg-blue-500',
    status: 'active',
    minTrips: '50',
    ratings: '4.50',
    cancellationRate: '20',
    acceptanceRate: '80',
  },
  {
    id: 'elite',
    level: 'Elite',
    badgeColor: 'bg-indigo-500',
    headerColor: 'bg-blue-500',
    status: 'active',
    minTrips: '10000',
    ratings: '5.00',
    cancellationRate: '0',
    acceptanceRate: '100',
  },
];

function RewardCard({
  reward,
  onUpdate,
  onDelete,
}: {
  reward: RewardLevel;
  onUpdate: (field: keyof RewardLevel, value: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader className={`p-3 ${reward.headerColor} rounded-t-lg`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <h3 className="font-semibold">{reward.level}</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => onDelete(reward.id)}>
              <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <div
            className={`flex h-[150px] w-[150px] items-center justify-center rounded-full ${reward.badgeColor}`}
          >
            <Award className="h-20 w-20 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${reward.id}-level`}>
              Level <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`${reward.id}-level`}
              value={reward.level}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${reward.id}-status`}>Status</Label>
            <Select
              value={reward.status}
              onValueChange={(value) => onUpdate('status', value)}
            >
              <SelectTrigger id={`${reward.id}-status`}>
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
            <Label htmlFor={`${reward.id}-min-trips`}>Minimum Trips</Label>
            <Input
              id={`${reward.id}-min-trips`}
              value={reward.minTrips}
              onChange={(e) => onUpdate('minTrips', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${reward.id}-ratings`}>Ratings</Label>
            <Input
              id={`${reward.id}-ratings`}
              value={reward.ratings}
              onChange={(e) => onUpdate('ratings', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${reward.id}-cancellation`}>
              Cancellation Rate
            </Label>
            <div className="relative">
              <Input
                id={`${reward.id}-cancellation`}
                value={reward.cancellationRate}
                onChange={(e) => onUpdate('cancellationRate', e.target.value)}
                className="pr-8"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                %
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${reward.id}-acceptance`}>Acceptance Rate</Label>
            <div className="relative">
              <Input
                id={`${reward.id}-acceptance`}
                value={reward.acceptanceRate}
                onChange={(e) => onUpdate('acceptanceRate', e.target.value)}
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
  const [rewards, setRewards] = useState<RewardLevel[]>(initialRewardLevels);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReward, setNewReward] = useState({
    level: '',
    badgeColor: 'bg-gray-500',
  });
  const { toast } = useToast();

  const handleUpdate = (
    id: string,
    field: keyof RewardLevel,
    value: string
  ) => {
    setRewards((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleAddReward = () => {
    if (!newReward.level) {
        toast({ variant: 'destructive', title: 'Error', description: 'Reward level name is required.' });
        return;
    }
    const newId = newReward.level.toLowerCase().replace(/\s/g, '-');
    const newRewardData: RewardLevel = {
      id: newId,
      level: newReward.level,
      badgeColor: newReward.badgeColor,
      headerColor: 'bg-blue-500',
      status: 'active',
      minTrips: '0',
      ratings: '0.00',
      cancellationRate: '0',
      acceptanceRate: '0',
    };
    setRewards((prev) => [...prev, newRewardData]);
    toast({ title: 'Reward Added', description: `${newReward.level} has been added.` });
    setNewReward({ level: '', badgeColor: 'bg-gray-500' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteReward = (id: string) => {
    setRewards(prev => prev.filter(r => r.id !== id));
    toast({ title: 'Reward Deleted', description: 'The reward level has been removed.' });
  }

  const handleSaveChanges = () => {
    // In a real app, you'd save this to a backend.
    console.log('Saving rewards:', rewards);
    toast({
      title: 'Changes Saved!',
      description: 'Your reward settings have been updated.',
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Reward Setting"
        actions={
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">
                Active Campaign: <span className="font-bold">Super reward</span>
            </span>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Reward
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Reward Level</DialogTitle>
                  <DialogDescription>
                    Define a new reward tier for your drivers.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-reward-level">Level Name</Label>
                    <Input
                      id="new-reward-level"
                      value={newReward.level}
                      onChange={(e) =>
                        setNewReward({ ...newReward, level: e.target.value })
                      }
                      placeholder="e.g., Platinum"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-reward-color">Badge Color</Label>
                    <Select
                      value={newReward.badgeColor}
                      onValueChange={(value) =>
                        setNewReward({ ...newReward, badgeColor: value })
                      }
                    >
                      <SelectTrigger id="new-reward-color">
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-gray-500">Gray</SelectItem>
                        <SelectItem value="bg-red-500">Red</SelectItem>
                        <SelectItem value="bg-green-500">Green</SelectItem>
                        <SelectItem value="bg-purple-500">Purple</SelectItem>
                        <SelectItem value="bg-pink-500">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  <Button onClick={handleAddReward}>Add Reward</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={handleSaveChanges}>Save All Changes</Button>
          </div>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onUpdate={(field, value) => handleUpdate(reward.id, field, value)}
            onDelete={handleDeleteReward}
          />
        ))}
      </div>
    </div>
  );
}
