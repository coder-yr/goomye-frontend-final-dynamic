import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import OrderHeader from "@/components/OrderHeader";
import ShippingInfo from "@/components/ShippingInfo";
import ContactPayment from "@/components/ContactPayment";
import OrderSummary from "@/components/OrderSummary";
import ProgressTracker from "@/components/ProgressTracker";
import ProductItem from "@/components/ProductItem";
import { Button } from "@/components/ui/button";
import { getOrderDetails } from "@/lib/orders";

const Index = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;
    getOrderDetails(orderId)
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load order");
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div>Loading order...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>No order found.</div>;

  // Map backend response to frontend props
  const shipping = order.shippingAddress || {};
  const summary = order.summary || {};
  const items = order.items || [];
  const timeline = order.timeline || [];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-card rounded-xl shadow-sm p-8 mb-6">
          <OrderHeader
            status={order.status || ""}
            orderNumber={order.orderId || ""}
            orderDate={order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
            total={`$${summary.total || 0}`}
          />
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ShippingInfo
              name={order.customerName || ""}
              address={shipping.line1 || ""}
              city={`${shipping.city || ""}${shipping.state ? ", " + shipping.state : ""}${shipping.country ? ", " + shipping.country : ""} ${shipping.zipcode || ""}`}
              phone={order.customerPhone || ""}
            />
            <div className="space-y-8">
              <ContactPayment
                email={order.customerEmail || ""}
                paymentMethod={order.paymentMethod || ""}
                cardLast4={""}
              />
            </div>
          </div>
          <div className="md:w-1/2 md:ml-auto mb-8">
            <OrderSummary
              subtotal={`$${summary.subtotal || 0}`}
              shipping={summary.shipping === 0 ? "Free" : `$${summary.shipping || 0}`}
              tax={`$${summary.estimatedTax || 0}`}
              sale={summary.sale ? `-$${summary.sale}` : "$0"}
              total={`$${summary.total || 0}`}
            />
          </div>
          <div className="flex items-center justify-between py-6 border-t border-b">
            <Button variant="link" className="px-0 text-foreground">
              Something wrong?{" "}
              <span className="underline ml-1">Exchange or return</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              Cancel order
            </Button>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>Estimated delivery: <span className="font-semibold text-foreground">{order.estimatedDelivery || ""}</span></span>
          </div>
          <ProgressTracker steps={timeline.map((t: any) => ({ label: t.status, status: t.completed ? "completed" : "pending" }))} />
        </div>
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          {items.map((item: any, idx: number) => (
            <ProductItem
              key={idx}
              name={item.name || ""}
              price={`$${item.price || 0}`}
              color={item.color || ""}
              size={item.size || ""}
              quantity={item.quantity || 1}
              image={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
