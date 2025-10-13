import { Product } from "@/types/return";
import { BASE, apiFetch } from "./api";
import { ROUTES } from "./apiRoutes";

// Fetch products eligible for return
export async function fetchReturnProducts(): Promise<Product[]> {
  try {
    const data = await apiFetch(`${BASE}${ROUTES.RETURNS.PRODUCTS}`);
    return data.products;
  } catch (error) {
    console.error("Error fetching return products:", error);
    throw new Error("Failed to fetch products");
  }
}

// Submit a return request
export async function submitReturnRequest(data: any): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.CONFIRM}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error submitting return request:", error);
    throw new Error("Failed to submit return request");
  }
}

// Get return categories
export async function getReturnCategories(): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.CATEGORIES}`);
  } catch (error) {
    console.error("Error fetching return categories:", error);
    throw new Error("Failed to fetch return categories");
  }
}

// Get user profile for returns
export async function getReturnProfile(): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.PROFILE}`);
  } catch (error) {
    console.error("Error fetching return profile:", error);
    throw new Error("Failed to fetch return profile");
  }
}

// Get user's wishlist
export async function getReturnWishlist(): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.WISHLIST}`);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw new Error("Failed to fetch wishlist");
  }
}

// Get user's refund requests
export async function getMyRefunds(): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.MY_REFUNDS}`);
  } catch (error) {
    console.error("Error fetching refunds:", error);
    throw new Error("Failed to fetch refunds");
  }
}

// Get refund status for a specific order
export async function getRefundStatus(orderId: string): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.REFUND_STATUS(orderId)}`);
  } catch (error) {
    console.error(`Error fetching refund status for order ${orderId}:`, error);
    throw new Error("Failed to fetch refund status");
  }
}

// Get refund options
export async function getRefundOptions(): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.REFUND_OPTIONS}`);
  } catch (error) {
    console.error("Error fetching refund options:", error);
    throw new Error("Failed to fetch refund options");
  }
}

// Get delivery options for returns
export async function getDeliveryOptions(): Promise<any> {
  try {
    return await apiFetch(`${BASE}${ROUTES.RETURNS.DELIVERY_OPTIONS}`);
  } catch (error) {
    console.error("Error fetching delivery options:", error);
    throw new Error("Failed to fetch delivery options");
  }
}
