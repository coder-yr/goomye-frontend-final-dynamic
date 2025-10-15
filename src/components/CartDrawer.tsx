import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  image: string;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
}

const CartDrawer = ({ open, onOpenChange, cartItems }: CartDrawerProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-normal">
              Cart ({cartItems.length} items)
            </SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <span className="text-xs">Esc</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </SheetHeader>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-4 border-b">
          <p className="text-sm font-medium text-foreground mb-1">
            Free shipping on orders over $50
          </p>
          <div className="text-sm">
            <button className="underline hover:no-underline font-medium">
              Log In
            </button>
            <span className="mx-1">or</span>
            <button className="underline hover:no-underline font-medium">
              Register
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-20 bg-muted rounded flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                  <button className="absolute -top-2 -right-2 w-6 h-6 bg-background border rounded-full flex items-center justify-center hover:bg-muted">
                    <Heart className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                    <span className={`text-sm font-medium ${item.originalPrice ? 'text-destructive' : ''}`}>
                      ${item.price}
                    </span>
                  </div>
                  <button className="text-xs underline hover:no-underline mt-1">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="text-xl font-medium">${subtotal}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shipping, taxes and discounts are calculated at checkout.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={() => { onOpenChange(false); navigate("/cart"); }}>
              View cart ({cartItems.length})
            </Button>
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => { onOpenChange(false); navigate("/checkout"); }}>
              Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
