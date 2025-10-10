import { StarRating } from "./StarRating";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title?: string;
  content: string;
  verified: boolean;
  images?: string[];
  helpful: { yes: number; no: number };
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const [helpfulVote, setHelpfulVote] = useState<'yes' | 'no' | null>(null);
  const [votes, setVotes] = useState(review.helpful);

  const handleVote = (vote: 'yes' | 'no') => {
    if (helpfulVote === vote) {
      setVotes(prev => ({
        ...prev,
        [vote]: prev[vote] - 1
      }));
      setHelpfulVote(null);
    } else {
      if (helpfulVote) {
        setVotes(prev => ({
          ...prev,
          [helpfulVote]: prev[helpfulVote] - 1,
          [vote]: prev[vote] + 1
        }));
      } else {
        setVotes(prev => ({
          ...prev,
          [vote]: prev[vote] + 1
        }));
      }
      setHelpfulVote(vote);
    }
  };

  return (
    <div className="border-t pt-6 first:border-t-0 first:pt-0">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <StarRating rating={review.rating} size="sm" />
          <div className="mt-2">
            <h3 className="font-semibold text-foreground">{review.author}</h3>
            <p className="text-sm text-muted-foreground">{review.date}</p>
            {review.verified && (
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--verified))]" />
                <span className="text-sm text-[hsl(var(--verified))] font-medium">
                  Verified purchase
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {review.title && (
            <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
          )}
          <p className="text-muted-foreground leading-relaxed">{review.content}</p>
          
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mt-4">
              {review.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Review image ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-muted-foreground">Was it helpful to you?</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote('yes')}
                className={helpfulVote === 'yes' ? 'bg-primary/10 border-primary' : ''}
              >
                Yes: {votes.yes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote('no')}
                className={helpfulVote === 'no' ? 'bg-destructive/10 border-destructive' : ''}
              >
                No: {votes.no}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


