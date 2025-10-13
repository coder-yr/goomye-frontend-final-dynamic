import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface OrderSummaryProps {
  subtotal: string;
  shipping: string;
  tax: string;
  sale: string;
  total: string;
}

const OrderSummary = ({ subtotal, shipping, tax, sale, total }: OrderSummaryProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        <span className="font-medium">{shipping}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Estimated Tax</span>
        <span className="font-medium">{tax}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Sale</span>
        <span className="font-medium">{sale}</span>
      </div>
      <div className="pt-3 border-t flex justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">USD {total}</span>
      </div>
      <Button variant="ghost" size="sm" className="w-full mt-4">
        <Printer className="w-4 h-4 mr-2" />
        View or Print receipt
      </Button>
    </div>
  );
};

export default OrderSummary;
