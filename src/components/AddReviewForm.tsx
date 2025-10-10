import { useState } from "react";
import { Star, Upload } from "lucide-react";

interface AddReviewFormProps {
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
    recommend: boolean;
    photos?: File[];
  }) => void;
  onCancel?: () => void;
}

export const AddReviewForm = ({ onSubmit, onCancel }: AddReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms || recommend === null) return;
    
    setSubmitting(true);
    onSubmit({ rating, title, comment, recommend, photos });
    setSubmitting(false);
    handleReset();
  };

  const handleReset = () => {
    setRating(0);
    setTitle("");
    setComment("");
    setRecommend(null);
    setAgreeToTerms(false);
    setPhotos([]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Add a review</h2>
      
      {/* Star Rating */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-lg font-semibold">
            {rating > 0 ? `${rating}.0 out of 5` : ""}
          </span>
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label className="block text-sm font-semibold mb-2">Review title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Review Description */}
      <div>
        <label className="block text-sm font-semibold mb-2">Review description</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={6}
        />
        <p className="text-xs text-gray-500 mt-2">
          Problems with the product or delivery?{" "}
          <a href="#" className="text-green-600 font-semibold hover:underline">
            Send a report.
          </a>
        </p>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Add real photos of the product to help other customers{" "}
          <span className="font-normal text-gray-500">(Optional)</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
          <input
            type="file"
            id="photo-upload"
            className="hidden"
            accept="image/svg+xml,image/png,image/jpeg,image/gif"
            multiple
            onChange={handlePhotoUpload}
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              SVG, PNG, JPG or GIF (MAX. 800×400px)
            </p>
          </label>
        </div>
      </div>

      {/* Recommend Product */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Do you recommend this product?
        </label>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="recommend"
              checked={recommend === true}
              onChange={() => setRecommend(true)}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="recommend"
              checked={recommend === false}
              onChange={() => setRecommend(false)}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm">No</span>
          </label>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            required
          />
          <span className="text-sm text-gray-600">
            By publishing this review you agree with the{" "}
            <a href="#" className="text-green-600 font-semibold hover:underline">
              terms and conditions
            </a>
            .
          </span>
        </label>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={submitting || rating === 0 || !agreeToTerms || recommend === null}
        >
          {submitting ? "Submitting..." : "Submit review"}
        </button>
        <button
          type="button"
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
