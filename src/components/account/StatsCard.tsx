import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

const StatsCard = ({ icon: Icon, label, value }: StatsCardProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="p-3 bg-muted rounded-lg">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;