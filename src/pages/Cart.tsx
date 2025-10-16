import CartItem from "@/components/CartItem";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Cart = () => {
  const { items, updateItem, removeItem, isLoading, error } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your cart.</p>
          <Button onClick={() => navigate("/login")}>Log In</Button>
        </div>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading cart...</span>
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to get started</p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Shopping bag</h1>
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
            <div className="space-y-8">
              {items.map(item => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onQuantityChange={updateItem}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>
          {/* Right column - Order Summary */}
          <div className="lg:col-span-1">
            <CheckoutOrderSummary
              items={items}
              onEditCart={() => navigate("/")}
            />
            <Button 
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4" 
              onClick={() => navigate("/checkout")}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Checkout"
              )}
            </Button>
            <Button variant="outline" className="w-full mt-3 bg-[#FFC439] hover:bg-[#FFD666] border-[#FFC439] text-[#003087] font-semibold py-4">
              <svg className="h-5 w-auto mr-2" viewBox="0 0 100 32" fill="none">
                <path d="M12.237 8.471c.41-.393.945-.61 1.5-.61.554 0 1.09.217 1.5.61.41.394.64.928.64 1.492 0 .563-.23 1.098-.64 1.491-.41.394-.946.61-1.5.61-.555 0-1.09-.216-1.5-.61-.41-.393-.64-.928-.64-1.491 0-.564.23-1.098.64-1.492z" fill="#003087"/>
                <path d="M27.737 8.471c.41-.393.945-.61 1.5-.61.554 0 1.09.217 1.5.61.41.394.64.928.64 1.492 0 .563-.23 1.098-.64 1.491-.41.394-.946.61-1.5.61-.555 0-1.09-.216-1.5-.61-.41-.393-.64-.928-.64-1.491 0-.564.23-1.098.64-1.492z" fill="#0070E0"/>
                <text x="40" y="20" fill="#003087" fontSize="14" fontWeight="600">PayPal</text>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
