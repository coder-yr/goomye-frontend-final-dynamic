import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Confirmation = () => {
  // Get the product/order ID from localStorage or context (to be set on submit)
  const handleViewStatus = () => {
    // Example: get last submitted product/order ID
    const orderId = localStorage.getItem("lastReturnOrderId");
    if (orderId) {
      window.location.href = `/refund-status/${orderId}`;
    } else {
      alert("Order ID not found. Please try again.");
    }
  };

  return (
    <div className="text-center py-16 max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 mb-6 shadow-lg">
        <Check className="w-10 h-10 text-accent" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your request has been successfully registered</h2>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        I have successfully received your request to return this product, until we resolve this case you can track the status of your order.
      </p>
      <Button variant="outline" className="gap-2 hover:bg-secondary transition-all" onClick={handleViewStatus}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View status
      </Button>
    </div>
  );
};

export default Confirmation;
