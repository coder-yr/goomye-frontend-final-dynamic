import { useEffect, useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { ReviewCard } from "../components/ReviewCard";
import { ReviewPagination } from "../components/ReviewPagination";
import { EditReviewDialog } from "../components/EditReviewDialog";
import { DeleteReviewDialog } from "../components/DeleteReviewDialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { apiFetch } from "../lib/api";

const REVIEWS_PER_PAGE = 5;

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Completed");
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialog, setEditDialog] = useState({ open: false, review: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, review: null });

  useEffect(() => {
    // Fetch user reviews from backend with JWT
    apiFetch("/api/user/reviews")
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => {
        setReviews([]);
        // Optionally handle error (e.g., show message)
      });
  }, []);

  useEffect(() => {
    let filtered = reviews;
    if (search) {
      filtered = filtered.filter((r) =>
        r.title?.toLowerCase().includes(search.toLowerCase()) ||
        r.comment?.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Example filter logic (can be expanded)
    if (filter === "Completed") {
      filtered = filtered.filter((r) => r.rating >= 1);
    }
    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [search, filter, reviews]);

  const pageCount = Math.max(1, Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE));
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My account", href: "/account" },
          { label: "My Reviews" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="Completed">Filter by: Completed</option>
          <option value="All">All</option>
        </select>
        <Button className="ml-auto">Write a review</Button>
      </div>
      <div className="space-y-4">
        {paginatedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">
                {new Date(review.createdAt || review.date).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditDialog({ open: true, review })}
                >
                  Edit review
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive"
                  onClick={() => setDeleteDialog({ open: true, review })}
                >
                  Delete review
                </Button>
              </div>
            </div>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <ReviewPagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={setCurrentPage}
      />
      {editDialog.open && (
        <EditReviewDialog
          open={editDialog.open}
          onOpenChange={(open) => setEditDialog({ open, review: editDialog.review })}
          productName={editDialog.review?.title || ""}
          initialRating={editDialog.review?.rating || 0}
          initialReview={editDialog.review?.comment || ""}
          onSave={(rating, reviewText) => {
            // TODO: Implement save logic (API call)
            setEditDialog({ open: false, review: null });
          }}
        />
      )}
      {deleteDialog.open && (
        <DeleteReviewDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open, review: deleteDialog.review })}
          productName={deleteDialog.review?.title || ""}
          onConfirm={() => {
            // TODO: Implement delete logic (API call)
            setDeleteDialog({ open: false, review: null });
          }}
        />
      )}
    </div>
  );
}
