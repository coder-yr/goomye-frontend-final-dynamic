import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  alt: string;
}

const ProductCard = ({ image, title, price, originalPrice, rating, alt }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-none bg-muted/30 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-background overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/placeholder.svg') {
              target.src = '/placeholder.svg';
            }
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">₹{price.toLocaleString('en-IN')}</span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{originalPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? 'fill-primary text-primary'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
