import type { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  description?: string;
  className?: string;
  valueClassName?: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, description, className, valueClassName }) => {
  return (
    <Card className={cn("shadow-lg", className)}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="bg-gray-100 dark:bg-card p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={cn("text-2xl font-bold", valueClassName)}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
