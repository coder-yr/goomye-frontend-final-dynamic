export async function getProduct(id: string) {
  return safeJson(await fetch(`${BASE}/products/${id}`));
}
export const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8001/api";

async function safeJson(res: Response) {
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export async function getMegaMenu() {
  return safeJson(await fetch(`${BASE}/mega-menu`));
}

export async function getCategories() {
  return safeJson(await fetch(`${BASE}/categories`));
}

export async function getCollections() {
  return safeJson(await fetch(`${BASE}/collections`));
}

export async function getCarousel() {
  return safeJson(await fetch(`${BASE}/carousel`));
}

export async function getBanners() {
  return safeJson(await fetch(`${BASE}/banners`));
}

export async function getUnboxed() {
  return safeJson(await fetch(`${BASE}/unboxed`));
}

export async function getDeals() {
  return safeJson(await fetch(`${BASE}/deals`));
}

export async function getProducts(query = "") {
  return safeJson(await fetch(`${BASE}/products${query ? `?${query}` : ""}`));
}

export default {
  getMegaMenu,
  getCategories,
  getCollections,
  getCarousel,
  getBanners,
  getUnboxed,
  getDeals,
  getProducts,
  getProduct,
};
