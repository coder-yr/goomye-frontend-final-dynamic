import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductReviews, addProductReview } from "@/lib/api";
import { StarRating } from "./StarRating";
import { ReviewBreakdown } from "./ReviewBreakdown";
import { ReviewCard } from "./ReviewCard";
import { AddReviewForm } from "./AddReviewForm";
import { Button } from "./ui/button";
import { Star } from "lucide-react";


function getBreakdown(reviews) {
  const breakdown = [5, 4, 3, 2, 1].map(star => ({ stars: star, count: 0, percentage: 0 }));
  if (!reviews.length) return breakdown;
  reviews.forEach(r => {
    const idx = 5 - r.rating;
    if (breakdown[idx]) breakdown[idx].count++;
  });
  breakdown.forEach(b => {
    b.percentage = Math.round((b.count / reviews.length) * 100);
  });
  return breakdown;
}


export const ReviewsSection = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { id: productId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    getProductReviews(productId)
      .then(res => {
        setReviews(res.reviews ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reviews');
        setLoading(false);
      });
  }, [productId]);

  const handleReviewSubmit = async (review) => {
    if (!productId) return;
    setSubmitting(true);
    try {
      const res = await addProductReview(productId, review);
      // Add new review to top of list
      setReviews(prev => [res.review, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const breakdown = getBreakdown(reviews);
  const totalReviews = reviews.length;
  const averageRating = totalReviews ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2) : '0.00';

  return (
  <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold">Reviews</h1>
          <div className="flex items-center gap-1">
            <StarRating rating={Math.round(Number(averageRating))} size="sm" />
            <span className="text-sm font-medium">({averageRating})</span>
          </div>
          <span className="text-sm text-[hsl(var(--verified))]">
            {totalReviews} Reviews
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-5xl font-bold mb-2">{averageRating}</div>
              <div className="text-muted-foreground">out of 5</div>
              <Button 
                onClick={() => setShowForm(!showForm)}
                className="mt-4 bg-primary hover:bg-primary/90"
                disabled={!token}
              >
                Write a review
              </Button>
              {!token && (
                <div className="text-sm text-muted-foreground mt-2">Please log in to write a review.</div>
              )}
            </div>
          </div>
          <ReviewBreakdown breakdown={breakdown} />
        </div>
      </div>

      {showForm && (
        token && (
          <div className="mb-8 bg-white border rounded-lg p-6">
            <AddReviewForm 
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowForm(false)}
              submitting={submitting}
            />
          </div>
        )
      )}

      {loading ? (
        <div>Loading reviews...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {visibleReviews < reviews.length && (
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
