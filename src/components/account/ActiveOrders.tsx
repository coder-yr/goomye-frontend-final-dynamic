import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronDown, Truck, Package, CheckCircle, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getActiveOrders } from "@/lib/account";

const statusConfig = {
  transit: {
    label: "In transit",
    icon: Truck,
    className: "bg-transit text-transit-foreground",
  },
  preorder: {
    label: "Pre-order",
    icon: Package,
    className: "bg-preorder text-preorder-foreground",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    className: "bg-confirmed text-confirmed-foreground",
  },
};

const ActiveOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getActiveOrders()
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">Active orders</h2>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {loading && <div>Loading orders...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && orders.length === 0 && <div>No active orders found.</div>}
        {!loading && !error && orders.map((order) => {
          const StatusIcon = statusConfig[order.status]?.icon || Info;
          return (
            <div
              key={order.id || order.orderId}
              className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-border"
            >
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Order ID:</p>
                  <p className="font-semibold text-foreground">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date:</p>
                  <p className="font-medium text-foreground">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Price:</p>
                  <p className="font-semibold text-foreground">{order.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status:</p>
                  <Badge className={statusConfig[order.status]?.className || "bg-muted text-muted-foreground"}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[order.status]?.label || order.status}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Actions <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Track order</DropdownMenuItem>
                  <DropdownMenuItem>Contact support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Eye className="h-4 w-4 mr-2" />
        See all orders
      </Button>
    </div>
  );
};

export default ActiveOrders;