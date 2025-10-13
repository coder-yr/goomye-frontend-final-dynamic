
import { BASE_URL, ROUTES } from './apiRoutes';

export const BASE = BASE_URL;

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  options.headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`API fetch error for ${url}:`, error);
    throw error;
  }
}

export async function getProduct(id: string) {
  return apiFetch(`${BASE}${ROUTES.PRODUCTS.DETAILS(id)}`);
}

export async function getMegaMenu() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.MEGA_MENU}`);
}

export async function getCategories() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.CATEGORIES}`);
}

export async function getCollections() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.COLLECTIONS}`);
}

export async function getCarousel() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.CAROUSEL}`);
}

export async function getBanners() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.BANNERS}`);
}

export async function getUnboxed() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.UNBOXED}`);
}

export async function getDeals() {
  return apiFetch(`${BASE}${ROUTES.CONTENT.DEALS}`);
}

export async function getProducts(query = "") {
  return apiFetch(`${BASE}${ROUTES.PRODUCTS.BASE}${query ? `?${query}` : ""}`);
}

export async function getContent(section: string) {
  return apiFetch(`${BASE}${ROUTES.CONTENT.SECTION(section)}`);
}

// Review API helpers
export async function getProductReviews(productId: string) {
  return apiFetch(`${BASE}${ROUTES.PRODUCTS.REVIEWS(productId)}`);
}

export async function addProductReview(productId: string, review: {
  rating: number;
  title: string;
  comment: string;
  recommend: boolean;
  photos?: File[];
}) {
  try {
    // If photos are present, use FormData, else send JSON
    if (review.photos && review.photos.length > 0) {
      const formData = new FormData();
      formData.append("rating", String(review.rating));
      formData.append("title", review.title);
      formData.append("comment", review.comment);
      formData.append("recommend", String(review.recommend));
      review.photos.forEach((file, i) => formData.append(`photos[${i}]`, file));
      return apiFetch(`${BASE}${ROUTES.PRODUCTS.REVIEWS(productId)}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } else {
      return apiFetch(`${BASE}${ROUTES.PRODUCTS.REVIEWS(productId)}`, {
        method: "POST",
        body: JSON.stringify(review),
      });
    }
  } catch (error) {
    console.error(`Error adding product review for ${productId}:`, error);
    throw error;
  }
}
