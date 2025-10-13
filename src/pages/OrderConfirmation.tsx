import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Clock, ArrowRight, Loader2 } from "lucide-react";
import { getOrderDetails } from "@/lib/checkout";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        // Try to get order data from localStorage first (from payment process)
        const savedOrderData = localStorage.getItem('orderConfirmation');
        if (savedOrderData) {
          const parsed = JSON.parse(savedOrderData);
          setOrderData(parsed);
          setIsLoading(false);
          return;
        }

        // Fallback to mock data
        const mockOrderData = {
          orderId: "72813820",
          userEmail: "jamescollins@site.so",
          orderDate: new Date().toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            hour: 'numeric', 
            minute: '2-digit' 
          }),
          paymentStatus: "success",
          total: 229,
          currency: "USD",
          estimatedDelivery: "2025-09-25",
          items: [
            {
              productId: 1,
              name: "Nike Air Force 1",
              image: "https://via.placeholder.com/100",
              price: 150,
              quantity: 1,
              color: "White",
              size: "M"
            },
            {
              productId: 2,
              name: "Camo Blend Jacket",
              image: "https://via.placeholder.com/100",
              price: 60,
              originalPrice: 80,
              quantity: 1,
              color: "Camo",
              size: "M"
            }
          ],
          shippingAddress: {
            firstName: "James",
            lastName: "Collins",
            address: "280 Suzanne Throughway",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
          }
        };
        
        setOrderData(mockOrderData);
      } catch (error) {
        setError("Failed to load order data");
        console.error("Order data error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderData();
  }, []);

  // Calculate dynamic totals from order data
  const calculateTotals = () => {
    if (!orderData?.items) return { subtotal: 0, sale: 0, shipping: 0, tax: 0, total: 0 };
    
    const subtotal = orderData.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const sale = orderData.items.reduce((sum: number, item: any) => {
      if (item.originalPrice) {
        return sum + (item.originalPrice - item.price) * item.quantity;
      }
      return sum;
    }, 0);
    const shipping = 0;
    const tax = 0;
    const total = orderData.total || (subtotal + shipping + tax - sale);
    
    return { subtotal, sale, shipping, tax, total };
  };

  const { subtotal, sale, shipping, tax, total } = calculateTotals();

  useEffect(() => {
    // Clear cart when order is confirmed
    clearCart();
  }, [clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading order confirmation...</span>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || "Order data not found"}</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      <div className="w-full h-full bg-white rounded-xl shadow-lg p-10 flex flex-col lg:flex-row gap-12 mx-auto" style={{maxWidth: "1200px"}}>
        {/* Left: Confirmation & Next Steps */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-2xl font-bold mb-2">🎉 Order confirmed</div>
            <div className="text-lg font-medium mb-2">Thank you for your order!</div>
            <div className="text-sm mb-1">Your order number is <span className="font-bold">{orderData.orderId}</span></div>
            <div className="text-sm mb-4">An order confirmation has been sent to <span className="font-bold">{orderData.userEmail}</span></div>
            <div className="flex gap-4 mb-6">
              <Button variant="outline">Print confirmation</Button>
              <Button onClick={() => navigate("/products")}>Continue shopping</Button>
            </div>
            
            {/* Demo Payment Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Demo Payment Successful</h3>
                  <p className="text-sm text-green-800">
                    This was a demo payment. In a real application, this would process through a payment gateway like Stripe or PayPal.
                    {orderData?.transactionId && (
                      <span className="block mt-1">
                        Transaction ID: <code className="bg-white px-1 rounded text-xs">{orderData.transactionId}</code>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-lg font-semibold mb-4">What's next?</div>
            <ol className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 rounded-full p-2"><svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="8" stroke="#22c55e" strokeWidth="2"/><path d="M7 10l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/></svg></span>
                <span>Order placed <span className="text-xs text-muted-foreground">{orderData.orderDate}</span></span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="bg-gray-100 rounded-full p-2"><svg width="20" height="20" fill="none"><rect x="4" y="8" width="12" height="4" stroke="#6b7280" strokeWidth="2"/></svg></span>
                <span>Shipped</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="bg-gray-100 rounded-full p-2"><svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="8" stroke="#6b7280" strokeWidth="2"/></svg></span>
                <span>Out for delivery</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="bg-gray-100 rounded-full p-2"><svg width="20" height="20" fill="none"><path d="M5 10l5 5 5-5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg></span>
                <span>Delivered</span>
              </li>
            </ol>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            Need assistance?<br />
            Ask our customer service<br />
            Mon to Sun, 5 am to 8 pm PT<br />
            <a href="#" className="underline">Contact us</a>
          </div>
        </div>
        {/* Right: Order Summary */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Paid</span>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Estimated Tax</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Promo code</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sale</span>
              <span className="font-medium text-red-600">-${sale}</span>
            </div>
            <div className="flex justify-between text-base font-bold mt-2">
              <span>Total</span>
              <span>USD ${total}</span>
            </div>
          </div>
          <div className="divide-y">
            {orderData.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 py-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">Color: {item.color} | Size: {item.size} | Qty: {item.quantity}</div>
                  <div className="mt-1">
                    {item.originalPrice ? (
                      <span className="text-xs line-through text-muted-foreground mr-2">${item.originalPrice}</span>
                    ) : null}
                    <span className="font-semibold">${item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
