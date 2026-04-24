import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend,
  trendValue 
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{value}</div>
          {(description || trendValue) && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {trend === "up" && <span className="text-green-500 font-medium">+{trendValue}</span>}
              {trend === "down" && <span className="text-red-500 font-medium">-{trendValue}</span>}
              {description && <span>{description}</span>}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
