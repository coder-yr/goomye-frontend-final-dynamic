import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { getCards } from "@/lib/account";

const MyCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getCards()
      .then(data => {
        setCards(data.cards || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load cards");
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading cards...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!cards.length) return <div>No cards found.</div>;
  const favorite = cards.find(card => card.isDefault) || cards[0];
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">My cards</h2>
      <div className="space-y-4">
        <Badge className="bg-accent text-accent-foreground">Favorite card</Badge>
        <div className="flex items-center gap-4">
          <div className="w-20 h-14 bg-muted rounded-lg flex items-center justify-center">
            <CreditCard className="h-8 w-8 text-info" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Visa ending in {favorite?.last4}</h3>
            <p className="text-sm text-muted-foreground">Expiry {favorite?.expiryMonth}/{favorite?.expiryYear}</p>
            <div className="flex gap-3 mt-2">
              <button className="text-sm text-muted-foreground hover:text-foreground">Delete</button>
              <span className="text-muted-foreground">|</span>
              <button className="text-sm text-muted-foreground hover:text-foreground">Edit</button>
            </div>
          </div>
        </div>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        Manage cards
      </Button>
    </div>
  );
};

export default MyCards;