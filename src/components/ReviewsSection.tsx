import { useState } from "react";
import { StarRating } from "./StarRating";
import { ReviewBreakdown } from "./ReviewBreakdown";
import { ReviewCard } from "./ReviewCard";
import { AddReviewForm } from "./AddReviewForm";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

const mockReviews = [
  // ...mock review data as in your previous example...
];

const reviewBreakdown = [
  { stars: 5, count: 239, percentage: 70 },
  { stars: 4, count: 432, percentage: 95 },
  { stars: 3, count: 53, percentage: 15 },
  { stars: 2, count: 32, percentage: 10 },
  { stars: 1, count: 13, percentage: 5 }
];

export const ReviewsSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);

  const totalReviews = 645;
  const averageRating = 4.65;

  const handleReviewSubmit = (review: {
    rating: number;
    title: string;
    comment: string;
    recommend: boolean;
    photos?: File[];
  }) => {
    console.log("Review submitted:", review);
    // TODO: Send to API
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold">Reviews</h1>
          <div className="flex items-center gap-1">
            <StarRating rating={5} size="sm" />
            <span className="text-sm font-medium">({averageRating})</span>
          </div>
          <a href="#" className="text-sm text-[hsl(var(--verified))] hover:underline">
            {totalReviews} Reviews
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-5xl font-bold mb-2">{averageRating}</div>
              <div className="text-muted-foreground">out of 5</div>
              <Button 
                onClick={() => setShowForm(!showForm)}
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                Write a review
              </Button>
            </div>
          </div>
          <ReviewBreakdown breakdown={reviewBreakdown} />
        </div>
      </div>

      {showForm && (
        <div className="mb-8 bg-white border rounded-lg p-6">
          <AddReviewForm 
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="space-y-6">
        {mockReviews.slice(0, visibleReviews).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {visibleReviews < mockReviews.length && (
        <div className="text-center pt-6">
          <Button
            variant="outline"
            onClick={() => setVisibleReviews(prev => prev + 5)}
            className="rounded-full px-8"
          >
            View more reviews
          </Button>
        </div>
      )}
    </div>
  );
};
