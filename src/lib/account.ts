// Add account API helpers
import { BASE, apiFetch } from "./api";
import { ROUTES } from "./apiRoutes";

export async function getAccountStats() {
  try {
    const res = await fetch(`${BASE}${ROUTES.USER.STATS}`);
    if (!res.ok) throw new Error("Failed to fetch account stats");
    return res.json();
  } catch (error) {
    console.error("Error fetching account stats:", error);
    throw error;
  }
}

export async function getOrders(params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  dateRange?: string;
}) {
  // Build query string from parameters
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.dateRange) queryParams.append('dateRange', params.dateRange);

  const queryString = queryParams.toString();
  const url = queryString ? `${BASE}${ROUTES.ORDERS.BASE}?${queryString}` : `${BASE}${ROUTES.ORDERS.BASE}`;
  const res = await apiFetch(url);
  return res;
}

export async function getAddresses() {
  try {
    return apiFetch(`${BASE}${ROUTES.USER.ADDRESSES}`);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
}

export async function getCards() {
  try {
    return apiFetch(`${BASE}${ROUTES.USER.CARDS}`);
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
}

export async function getProfile() {
  try {
    const res = await apiFetch(`${BASE}${ROUTES.USER.PROFILE}`);
    // Backend returns { profile: {...} } — normalize to the profile object
    if (res && typeof res === 'object' && 'profile' in res) {
      console.log('Profile data received:', res.profile);
      return res.profile;
    }
    return res;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function updateProfile(data: any) {
  try {
    return apiFetch(`${BASE}${ROUTES.USER.PROFILE}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}