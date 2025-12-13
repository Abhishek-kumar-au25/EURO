import { User2, Car, Puzzle, Ban } from "lucide-react";
import StatCard from "@/components/stat-card";
import { drivers } from "@/lib/data";
import { users } from "@/lib/data";

export function OverviewCards() {
  const totalUsers = users.length;
  const activeDrivers = drivers.filter(d => d.status === 'Approved').length;
  const inactiveDrivers = drivers.filter(d => d.status !== 'Approved').length;
  const totalDrivers = drivers.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="User"
        value={totalUsers.toString()}
        icon={<User2 className="text-blue-500" />}
        valueClassName="text-blue-500"
        className="border-blue-500 border-2 shadow-lg"
      />
      <StatCard
        title="Active Driver"
        value={activeDrivers.toString()}
        icon={<Puzzle className="text-green-500" />}
        valueClassName="text-green-500"
        className="border-green-500 border-2 shadow-lg"
      />
       <StatCard
        title="Inactive Driver"
        value={inactiveDrivers.toString()}
        icon={<Puzzle className="text-yellow-500" />}
        valueClassName="text-yellow-500"
        className="border-yellow-500 border-2 shadow-lg"
      />
      <StatCard
        title="Driver"
        value={totalDrivers.toString()}
        icon={<Car className="text-red-500" />}
        valueClassName="text-red-500"
        className="border-red-500 border-2 shadow-lg"
      />
    </div>
  );
}
