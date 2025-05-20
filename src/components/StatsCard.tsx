
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  type?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  icon?: 'up' | 'down' | 'activity';
}

export function StatsCard({ title, value, description, type = 'default', icon }: StatsCardProps) {
  const getIconComponent = () => {
    switch (icon) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4" />;
      case 'activity':
        return <Activity className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'text-success bg-success/10';
      case 'danger':
        return 'text-destructive bg-destructive/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'info':
        return 'text-info bg-info/10';
      default:
        return 'text-foreground bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {icon && (
            <div className={`rounded-full p-1.5 ${getTypeClasses()}`}>
              {getIconComponent()}
            </div>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}
