import { BASE, apiFetch } from "./api";
import { ROUTES } from "./apiRoutes";

export async function getCart() {
  try {
  return apiFetch(`${BASE}${ROUTES.CART.BASE}`);
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function updateCartItem(id: number, quantity: number) {
  try {
    return apiFetch(`${BASE}${ROUTES.CART.ITEM(id)}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  } catch (error) {
    console.error(`Error updating cart item ${id}:`, error);
    throw error;
  }
}

export async function removeCartItem(id: number) {
  try {
    return apiFetch(`${BASE}${ROUTES.CART.ITEM(id)}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error removing cart item ${id}:`, error);
    throw error;
  }
}

export async function addCartItem(item: any) {
  try {
    return apiFetch(`${BASE}${ROUTES.CART.ADD}`, {
      method: "POST",
      body: JSON.stringify(item),
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
}
