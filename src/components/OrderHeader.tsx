import { Badge } from "@/components/ui/badge";

interface OrderHeaderProps {
  status: string;
  orderNumber: string;
  orderDate: string;
  total: string;
}

const OrderHeader = ({ status, orderNumber, orderDate, total }: OrderHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Status</p>
        <Badge variant="outline" className="gap-2 border-success text-success">
          <span className="w-2 h-2 rounded-full bg-success" />
          {status}
        </Badge>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Order at7ll</p>
        <p className="font-semibold">{orderNumber}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Order date</p>
        <p className="font-semibold">{orderDate}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="font-semibold">{total}</p>
      </div>
    </div>
  );
};

export default OrderHeader;
