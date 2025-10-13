import { BASE, apiFetch } from "./api";
import { ROUTES } from "./apiRoutes";

export interface CheckoutData {
  email: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: string;
  cart: any[];
}

export interface PaymentData {
  paymentMethod: "card" | "paypal";
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  useShippingAddress: boolean;
}

// Guest checkout
export async function guestCheckout(data: CheckoutData) {
  try {
    return apiFetch(`${BASE}${ROUTES.CHECKOUT.GUEST}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error processing guest checkout:", error);
    throw error;
  }
}

// Logged-in user checkout
export async function userCheckout(data: CheckoutData) {
  try {
    return apiFetch(`${BASE}${ROUTES.CHECKOUT.USER}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error processing user checkout:", error);
    throw error;
  }
}

// Process payment
export async function processPayment(data: PaymentData & { cart: any[]; shippingAddress: any; shippingMethod: string }) {
  try {
    return apiFetch(`${BASE}${ROUTES.CHECKOUT.PAYMENT}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
}

// Get order details
export async function getOrderDetails(orderId: string) {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.DETAILS(orderId)}`);
  } catch (error) {
    console.error(`Error fetching order details for order ${orderId}:`, error);
    throw error;
  }
}

// Track order
export async function trackOrder(orderId: string) {
  try {
    return apiFetch(`${BASE}${ROUTES.ORDERS.TRACK(orderId)}`);
  } catch (error) {
    console.error(`Error tracking order ${orderId}:`, error);
    throw error;
  }
}
