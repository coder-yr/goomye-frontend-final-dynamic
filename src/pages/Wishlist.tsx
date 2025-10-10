import { useEffect, useState } from "react";
import WishlistItem from "@/components/account/WishlistItem";
import { getWishlist, removeFromWishlist } from "@/lib/user";

const Wishlist = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getWishlist()
      .then((res) => {
        setItems(res?.wishlist ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load wishlist");
        setLoading(false);
      });
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const res = await removeFromWishlist(id);
      setItems(res?.wishlist ?? items.filter((i) => i.id !== id));
    } catch {
      // fallback update
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const handleMoveToBag = (id: number) => {
    // Optionally call cart API here
    alert(`Moved item ${id} to bag!`);
  };

  if (loading) return <div className="container mx-auto px-4 py-8">Loading wishlist...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  if (!items.length) return <div className="container mx-auto px-4 py-8">Your wishlist is empty.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My wishlist</h1>
      <div className="bg-white rounded-lg shadow">
        {items.map(item => (
          <WishlistItem
            key={item.id}
            image={item.image || "/placeholder.svg"}
            name={item.name}
            description={item.description || ""}
            price={typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : (item.price || "")}
            onRemove={() => handleRemove(item.id)}
            onMoveToBag={() => handleMoveToBag(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
