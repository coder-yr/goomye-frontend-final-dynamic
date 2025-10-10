// Add wishlist API helpers
import { BASE, apiFetch } from "./api";

export async function getWishlist() {
	return apiFetch(`${BASE}/user/wishlist`);
}

export async function addToWishlist(item: { id: string | number; name: string; image?: string; price?: number }) {
	return apiFetch(`${BASE}/user/wishlist`, {
		method: "POST",
		body: JSON.stringify(item),
	});
}

export async function removeFromWishlist(id: string | number) {
	return apiFetch(`${BASE}/user/wishlist/${id}`, {
		method: "DELETE",
	});
}
