import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const StarRating = ({ 
  rating, 
  onRatingChange, 
  interactive = false,
  size = "md",
  showLabel = false 
}: StarRatingProps) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRatingChange?.(star)}
          disabled={!interactive}
          className={cn(
            "transition-colors",
            interactive && "cursor-pointer hover:scale-110",
            !interactive && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizes[size],
              star <= rating
                ? "fill-[hsl(var(--star))] text-[hsl(var(--star))]"
                : "fill-none text-gray-300"
            )}
          />
        </button>
      ))}
      {showLabel && (
        <span className="ml-2 text-lg font-semibold">
          {rating.toFixed(1)} out of 5
        </span>
      )}
    </div>
  );
};
