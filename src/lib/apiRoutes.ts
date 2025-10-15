// API route constants for consistent route management

// Base API URL
export const BASE_URL = "https://goomye-backend-1.onrender.com/api";

// Product routes
export const ROUTES = {
  CHECKOUT: {
    PAYMENT: "/checkout/pay",
  },
  // Product routes
  PRODUCTS: {
    BASE: "/products",
    DETAILS: (id: string) => `/products/${id}`,
    REVIEWS: (id: string) => `/products/${id}/reviews`,
    TRENDING: "/products/trending",
  },
  
  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  
  // User routes
  USER: {
    PROFILE: "/account/profile",
    WISHLIST: "/user/wishlist",
    WISHLIST_ITEM: (id: string | number) => `/user/wishlist/${id}`,
    REVIEWS: "/user/reviews",
    STATS: "/account/stats",
    ADDRESSES: "/account/addresses",
    CARDS: "/account/cards",
  },
  
  // Cart routes
  CART: {
  BASE: "/cart",
  ITEM: (id: number) => `/cart/${id}`,
  ADD: "/cart",
  },
  
  // Order routes
  ORDERS: {
    BASE: "/orders",
    DETAILS: (id: string) => `/orders/${id}/details`,
    TRACK: (id: string) => `/orders/${id}/track`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    RETURN: (id: string) => `/orders/${id}/return`,
    INVOICE: (id: string) => `/orders/${id}/invoice`,
    STATS: "/orders/stats",
  },
  
  // Return routes
  RETURNS: {
    PRODUCTS: "/returns/products",
    CATEGORIES: "/returns/categories",
    PROFILE: "/returns/profile",
    WISHLIST: "/returns/wishlist",
    MY_REFUNDS: "/returns/my-refunds",
    REFUND_STATUS: (id: string) => `/returns/refund-status/${id}`,
    REFUND_OPTIONS: "/returns/refund-options",
    DELIVERY_OPTIONS: "/returns/delivery-options",
    CONFIRM: "/returns/confirm",
  },
  
  // Content routes
  CONTENT: {
    SECTION: (section: string) => `/content/${section}`,
    CAROUSEL: "/carousel",
    BANNERS: "/banners",
    UNBOXED: "/unboxed",
    DEALS: "/deals",
    MEGA_MENU: "/mega-menu",
    CATEGORIES: "/categories",
    COLLECTIONS: "/collections",
  },
};