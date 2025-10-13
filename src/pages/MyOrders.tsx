import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { ChevronLeft, Search, Filter, Calendar, Eye, Download, RefreshCw } from "lucide-react";
import { getOrders } from "@/lib/orders";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
  expectedDelivery?: string;
}

interface Order {
  id: string;
  placedAt: string;
  status: string;
  items: OrderItem[];
  promoCode?: string;
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
}

const FILTERS = ["All", "Created", "Accepted", "Ready To Ship", "Dispatched", "In Transist", "Delivered", "Returned", "Cancelled"];
const DATE_RANGES = ["All time", "Last 7 days", "Last 30 days", "Last 6 months"];

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dateRange, setDateRange] = useState("All time");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError("");
      
      const data = await getOrders({
        status: filter,
        search: search,
        page: page,
        limit: 10,
        dateRange: dateRange
      });
      
      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, filter, dateRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders(false);
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={handleRefresh}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">My orders</h2>
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          {/* Header with refresh button */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Order History</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <form className="flex gap-2 flex-1" onSubmit={handleSearch}>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Order ID"
                  className="border rounded-lg pl-10 pr-4 py-2 w-full"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button type="submit" variant="default">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            <div className="flex gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select 
                  className="border rounded-lg pl-10 pr-8 py-2 appearance-none bg-white"
                  value={dateRange}
                  onChange={e => setDateRange(e.target.value)}
                >
                  {DATE_RANGES.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Status filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="font-medium text-sm text-muted-foreground mr-2">Filter by status:</span>
            {FILTERS.map(f => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className="text-xs"
              >
                {f}
              </Button>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
          {/* Orders table */}
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No orders found</h3>
                <p className="text-sm">
                  {search || filter !== "All" || dateRange !== "All time" 
                    ? "Try adjusting your filters or search terms."
                    : "You haven't placed any orders yet."
                  }
                </p>
              </div>
              {search || filter !== "All" || dateRange !== "All time" ? (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                    setDateRange("All time");
                    setPage(1);
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button onClick={() => navigate("/products")}>
                  Start Shopping
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left text-muted-foreground font-medium">ORDER ID</th>
                    <th className="py-3 px-4 text-left text-muted-foreground font-medium">DATE</th>
                    <th className="py-3 px-4 text-left text-muted-foreground font-medium">TOTAL</th>
                    <th className="py-3 px-4 text-left text-muted-foreground font-medium">STATUS</th>
                    <th className="py-3 px-4 text-left text-muted-foreground font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">#{order.id}</td>
                      <td className="py-3 px-4 text-muted-foreground">{order.placedAt}</td>
                      <td className="py-3 px-4 font-semibold">${order.total}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewOrder(order.id)}
                            className="h-8 px-2"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination */}
          {orders.length > 0 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                Showing {Math.min((page-1)*10+1, total)}-{Math.min(page*10, total)} of {total} orders
              </span>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page === 1 || loading} 
                  onClick={() => setPage(page-1)}
                >
                  Previous
                </Button>
                {[...Array(Math.min(totalPages, 5)).keys()].map(i => (
                  <Button 
                    key={i+1} 
                    variant={page === i+1 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setPage(i+1)}
                    disabled={loading}
                  >
                    {i+1}
                  </Button>
                ))}
                {totalPages > 5 && <span className="px-2 text-muted-foreground">...</span>}
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page === totalPages || loading} 
                  onClick={() => setPage(page+1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 mt-6"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default MyOrders;
