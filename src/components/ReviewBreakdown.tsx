import { Star } from "lucide-react";

interface BreakdownItem {
  stars: number;
  count: number;
  percentage: number;
}

interface ReviewBreakdownProps {
  breakdown: BreakdownItem[];
}

export const ReviewBreakdown = ({ breakdown }: ReviewBreakdownProps) => {
  return (
    <div className="space-y-2">
      {breakdown.map((item) => (
        <div key={item.stars} className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-8">
            <span className="text-sm font-medium">{item.stars}</span>
            <Star className="w-3 h-3 fill-[hsl(var(--star))] text-[hsl(var(--star))]" />
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--star))] transition-all"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
          <span className="text-sm text-[hsl(var(--verified))] font-medium w-24">
            {item.count} reviews
          </span>
        </div>
      ))}
    </div>
  );
};
