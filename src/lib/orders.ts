import { BASE, apiFetch } from "./api";
import { ROUTES } from "./apiRoutes";

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
  color: string;
  size: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  estimatedTax: number;
  promoCode: string;
  sale: number;
  total: number;
  currency: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface OrderDetails {
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

export interface Order {
  orderId: string;
  id: string;
  placedAt: string;
  status: string;
  items: OrderItem[];
  promoCode?: string;
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  customer?: {
    name: string;
    email: string;
  };
  address?: {
    line1: string;
    city: string;
    state: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  orders: Order[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  userId: string;
}

export interface OrderFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  dateRange?: string;
}

// Get orders with filters
export async function getOrders(filters?: OrderFilters): Promise<OrdersResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    if (filters?.dateRange) queryParams.append('dateRange', filters.dateRange);

    const queryString = queryParams.toString();
    const url = queryString ? `${BASE}${ROUTES.ORDERS.BASE}?${queryString}` : `${BASE}${ROUTES.ORDERS.BASE}`;
    
    return apiFetch(url);
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// Get single order details
export async function getOrderDetails(orderId: string): Promise<OrderDetails> {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.DETAILS(orderId)}`);
  } catch (error) {
    console.error(`Error fetching order details for ${orderId}:`, error);
    throw error;
  }
}

// Track order
export async function trackOrder(orderId: string): Promise<any> {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.TRACK(orderId)}`);
  } catch (error) {
    console.error(`Error tracking order ${orderId}:`, error);
    throw error;
  }
}

// Cancel order
export async function cancelOrder(orderId: string, reason?: string): Promise<any> {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.CANCEL(orderId)}`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  } catch (error) {
    console.error(`Error canceling order ${orderId}:`, error);
    throw error;
  }
}

// Request return
export async function requestReturn(orderId: string, items: Array<{ productId: number; quantity: number }>, reason: string): Promise<any> {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.RETURN(orderId)}`, {
      method: "POST",
      body: JSON.stringify({ items, reason }),
    });
  } catch (error) {
    console.error(`Error requesting return for order ${orderId}:`, error);
    throw error;
  }
}

// Download invoice
export async function downloadInvoice(orderId: string): Promise<Blob> {
  try {
    const response = await fetch(`${BASE}${ROUTES.ORDERS.INVOICE(orderId)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to download invoice');
    }
    
    return response.blob();
  } catch (error) {
    console.error(`Error downloading invoice for order ${orderId}:`, error);
    throw error;
  }
}

// Get order statistics
export async function getOrderStats(): Promise<{
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalSpent: number;
}> {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.STATS}`);
  } catch (error) {
    console.error("Error fetching order stats:", error);
    throw error;
  }
}
