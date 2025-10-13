import { Heart, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";

export interface CartItemData {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  lowStock?: boolean;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = async (quantity: number) => {
    setIsUpdating(true);
    try {
      await onQuantityChange(item.productId, quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.productId);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="relative flex-shrink-0">
        <div className="w-36 h-36 bg-muted rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-card/80 hover:bg-card rounded-full"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
          <div className="flex items-center gap-2">
            {item.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ${item.originalPrice}
              </span>
            )}
            <span className={item.originalPrice ? "text-destructive font-semibold" : "font-semibold"}>
              ${item.price}
            </span>
          </div>
          {item.lowStock && (
            <div className="flex items-center gap-1 mt-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Low in stock</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Color</label>
            <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm w-fit">
              {item.color}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Size</label>
            <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm w-fit">
              {item.size}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Quantity</label>
            <QuantitySelector
              quantity={item.quantity}
              onChange={handleQuantityChange}
              disabled={isUpdating}
            />
          </div>
        </div>

        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-sm underline text-foreground hover:text-muted-foreground self-start disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isRemoving ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Removing...
            </>
          ) : (
            "Remove"
          )}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
