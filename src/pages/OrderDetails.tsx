import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  CreditCard,
  Download,
  RefreshCw,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';
import { getOrderDetails } from '@/lib/orders';

interface OrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
  color: string;
  size: string;
}

interface OrderSummary {
  subtotal: number;
  shipping: number;
  estimatedTax: number;
  promoCode: string;
  sale: number;
  total: number;
  currency: string;
}

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

interface OrderDetails {
  orderId: string;
  status: string;
  paymentStatus: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  summary: OrderSummary;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  cardDetails?: {
    last4: string;
    expiryDate: string;
    cardName: string;
  };
  timeline: Array<{
    status: string;
    date: string | null;
    completed: boolean;
  }>;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getOrderDetails(orderId);
      setOrderDetails(response);
    } catch (err) {
      setError('Failed to load order details');
      toast.error('Failed to load order details');
      console.error('Order details error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'order confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'preparing for shipment':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-blue-600" />;
      case 'out for delivery':
        return <Truck className="h-4 w-4 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'order cancelled':
        return <Clock className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'created':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'ready to ship':
        return 'bg-yellow-100 text-yellow-800';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'in transist':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'Order not found'}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={fetchOrderDetails}>Retry</Button>
            <Button variant="outline" onClick={() => navigate('/orders')}>
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/orders')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-muted-foreground">Order #{orderDetails.orderId}</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getStatusColor(orderDetails.status)} text-sm px-3 py-1`}>
                  {orderDetails.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Payment: {orderDetails.paymentStatus}
                </span>
              </div>
              
              {/* Timeline */}
              <div className="space-y-3">
                {orderDetails.timeline.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        step.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.status}
                      </p>
                      {step.date && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(step.date).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.color} • Size {item.size}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.subtotal}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderDetails.summary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderDetails.summary.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderDetails.summary.estimatedTax}</span>
                </div>
                {orderDetails.summary.sale > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${orderDetails.summary.sale}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderDetails.summary.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{orderDetails.customerName}</p>
                  <p>{orderDetails.shippingAddress.line1}</p>
                  {orderDetails.shippingAddress.line2 && (
                    <p>{orderDetails.shippingAddress.line2}</p>
                  )}
                  <p>
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipcode}
                  </p>
                  <p>{orderDetails.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>{orderDetails.paymentMethod}</span>
                  </div>
                  {orderDetails.cardDetails && (
                    <div className="text-sm text-muted-foreground">
                      <p>**** **** **** {orderDetails.cardDetails.last4}</p>
                      <p>Expires {orderDetails.cardDetails.expiryDate}</p>
                      <p>{orderDetails.cardDetails.cardName}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{orderDetails.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{orderDetails.customerEmail}</span>
                </div>
                {orderDetails.customerPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{orderDetails.customerPhone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order Placed</p>
                  <p className="font-medium">
                    {new Date(orderDetails.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {new Date(orderDetails.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" onClick={() => navigate(`/order-track/${orderDetails.orderId}`)}>
              Track Package
            </Button>
            <Button variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
