import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import OrderItem from "@/components/OrderItem";
import { ChevronLeft, ChevronRight, ExternalLink, MoreVertical } from "lucide-react";

import { getOrders } from "@/lib/account";

const AllOrders = () => {
  const [promoCode, setPromoCode] = useState("THANKYOU");
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getOrders()
      .then((data) => {
        // Map API data to UI shape
        const items = (data.orders || []).flatMap(order =>
          (order.items || []).map(item => ({
            id: item.id,
            image: item.image,
            name: item.name,
            size: item.size,
            color: item.color,
            price: item.price,
            quantity: item.quantity,
            deliveryDate: item.deliveryDate
          }))
        );
        setOrderItems(items);
        // Example: calculate totals from API response
        setSubtotal(data.subtotal || 0);
        setDelivery(data.delivery || 0);
        setTax(data.tax || 0);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h1 className="text-xl font-semibold">Order #32543</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                Export
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Order Info */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <p className="text-sm text-muted-foreground">
              Order placed: 17 Aug, 2025, 5:48 am
            </p>
            <div className="flex gap-2">
              <Badge className="bg-success text-success-foreground hover:bg-success">
                Paid
              </Badge>
              <Badge className="bg-warning text-warning-foreground hover:bg-warning">
                Unfulfilled
              </Badge>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6">
            {orderItems.map((item) => (
              <OrderItem key={item.id} {...item} />
            ))}
          </div>

          {/* Promo Code */}
          <div className="px-6 py-6 border-t border-border">
            <div className="flex flex-col items-end gap-4">
              <div className="w-full max-w-md">
                <p className="text-center text-sm font-medium mb-3">Promo code</p>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                    disabled
                  />
                  <Button className="bg-success hover:bg-success/90 text-success-foreground">
                    Redeem
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full max-w-md space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery (Standard delivery):</span>
                  <span className="font-medium">{delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Order total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Button>
            <p className="text-sm text-muted-foreground">Order 36 of 129</p>
            <Button variant="ghost" size="sm" className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
