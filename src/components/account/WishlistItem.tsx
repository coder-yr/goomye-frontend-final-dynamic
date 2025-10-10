import { Button } from "@/components/ui/button";

interface WishlistItemProps {
  image: string;
  name: string;
  description: string;
  price: string;
  onRemove: () => void;
  onMoveToBag: () => void;
}

const WishlistItem = ({ image, name, description, price, onRemove, onMoveToBag }: WishlistItemProps) => {
  return (
    <div className="flex items-center gap-8 py-6 border-b border-border">
      <img src={image} alt={name} className="w-16 h-16 object-contain" />
      
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">Name</p>
        <h3 className="font-medium text-foreground">{name}</h3>
        <p className="text-sm text-foreground">{description}</p>
      </div>
      
      <div className="mr-24">
        <p className="text-sm text-muted-foreground mb-1">Price:</p>
        <p className="text-lg font-medium text-foreground">{price}</p>
      </div>
      
      <div className="flex gap-4">
        <Button variant="remove" onClick={onRemove} className="min-w-[120px]">
          Remove
        </Button>
        <Button variant="default" onClick={onMoveToBag} className="min-w-[140px]">
          Move To BAG
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
