interface OrderItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CheckoutOrderSummaryProps {
  items: OrderItem[];
  onEditCart: () => void;
}

const CheckoutOrderSummary = ({ items, onEditCart }: CheckoutOrderSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const sale = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const shipping = 0; // Free
  const tax = 0;
  const total = subtotal + shipping + tax - sale;

  return (
    <div className="bg-background p-6 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <button
          onClick={onEditCart}
          className="text-sm underline hover:text-muted-foreground"
        >
          Edit cart
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">Free</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="font-medium">${tax}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Promo code</span>
          <button className="text-sm underline hover:text-foreground">Enter code</button>
        </div>

        {sale > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sale</span>
            <span className="font-medium text-destructive">-${sale}</span>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-baseline">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-semibold">USD ${total}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-muted-foreground">Color: {item.color}</p>
              <p className="text-xs text-muted-foreground">Size: {item.size}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              <div className="flex items-center gap-2 mt-1">
                {item.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${item.originalPrice}
                  </span>
                )}
                <span className={`text-sm font-semibold ${item.originalPrice ? 'text-destructive' : ''}`}>
                  ${item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
