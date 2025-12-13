import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { feedback } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

export function RecentFeedback() {
  return (
    <div className="space-y-6">
      {feedback.slice(0, 4).map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.driverAvatarUrl} alt={item.driverName} />
            <AvatarFallback>
              {item.driverName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="flex items-center gap-2 text-sm">
                <p className="font-semibold">{item.driverName}</p>
                <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {item.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
