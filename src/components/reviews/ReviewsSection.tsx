import { useState } from "react";
import { StarRating } from "./StarRating";
import { ReviewBreakdown } from "./ReviewBreakdown";
import { ReviewCard } from "./ReviewCard";
import { AddReviewForm } from "./AddReviewForm";
import { Button } from "@/components/ui/button";

const mockReviews = [
  { id: "1", author: "Micheal Gough", date: "November 18 2023 at 15:35", rating: 5, content: "My old iMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I'm very happy with this purchase.", verified: true, helpful: { yes: 3, no: 0 } },
  { id: "2", author: "Jese Leos", date: "November 18 2023 at 15:35", rating: 5, content: "It's fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual, everything runs perfect in this computer. Highly recommend!", verified: true, images: ["/placeholder.svg", "/placeholder.svg"], helpful: { yes: 1, no: 0 } },
  { id: "3", author: "Bonnie Green", date: "November 15 2023 at 10:20", rating: 5, content: "My old iMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I'm very happy with this purchase.", verified: true, helpful: { yes: 0, no: 0 } },
];

const reviewBreakdown = [
  { stars: 5, count: 239, percentage: 70 },
  { stars: 4, count: 432, percentage: 95 },
  { stars: 3, count: 53, percentage: 15 },
  { stars: 2, count: 32, percentage: 10 },
  { stars: 1, count: 13, percentage: 5 },
];

export const ReviewsSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);

  const totalReviews = 645;
  const averageRating = 4.65;

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
        <div className="mb-8">
          <AddReviewForm />
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


