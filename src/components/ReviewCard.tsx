import { StarRating } from "./StarRating";

export interface Review {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm space-y-2">
      <div className="flex items-center gap-3">
        {review.user.avatarUrl ? (
          <img
            src={review.user.avatarUrl}
            alt={review.user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
            {review.user.name[0]}
          </div>
        )}
        <div>
          <div className="font-medium text-sm">{review.user.name}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <StarRating rating={review.rating} size={12} />
            <span className="ml-1">{review.rating}</span>
            <span className="mx-2">·</span>
            <span>{new Date(review.date).toLocaleDateString()}</span>
            {review.verified && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="font-semibold text-base">{review.title}</div>
      <div className="text-gray-700 text-sm">{review.comment}</div>
    </div>
  );
};
