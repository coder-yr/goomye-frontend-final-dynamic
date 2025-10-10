
export const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8001/api";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  options.headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export async function getProduct(id: string) {
  return apiFetch(`${BASE}/products/${id}`);
}


export async function getMegaMenu() {
  return apiFetch(`${BASE}/mega-menu`);
}

export async function getCategories() {
  return apiFetch(`${BASE}/categories`);
}

export async function getCollections() {
  return apiFetch(`${BASE}/collections`);
}

export async function getCarousel() {
  return apiFetch(`${BASE}/carousel`);
}

export async function getBanners() {
  return apiFetch(`${BASE}/banners`);
}

export async function getUnboxed() {
  return apiFetch(`${BASE}/unboxed`);
}

export async function getDeals() {
  return apiFetch(`${BASE}/deals`);
}

export async function getProducts(query = "") {
  return apiFetch(`${BASE}/products${query ? `?${query}` : ""}`);
}

export async function getContent(section: string) {
  return apiFetch(`${BASE}/content/${section}`);
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
  getContent,
};
