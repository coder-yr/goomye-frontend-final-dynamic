// Add wishlist API helpers
import { BASE, apiFetch } from "./api";
import { ROUTES } from "./apiRoutes";

export async function getWishlist() {
	try {
		return apiFetch(`${BASE}${ROUTES.USER.WISHLIST}`);
	} catch (error) {
		console.error("Error fetching wishlist:", error);
		throw error;
	}
}

export async function addToWishlist(item: { id: string | number; name: string; image?: string; price?: number }) {
	try {
		return apiFetch(`${BASE}${ROUTES.USER.WISHLIST}`, {
			method: "POST",
			body: JSON.stringify(item),
		});
	} catch (error) {
		console.error("Error adding item to wishlist:", error);
		throw error;
	}
}

export async function removeFromWishlist(id: string | number) {
	try {
		return apiFetch(`${BASE}${ROUTES.USER.WISHLIST_ITEM(id)}`, {
			method: "DELETE",
		});
	} catch (error) {
		console.error(`Error removing item ${id} from wishlist:`, error);
		throw error;
	}
}

