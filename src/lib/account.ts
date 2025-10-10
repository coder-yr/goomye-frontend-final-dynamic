import { BASE } from "./api";

export async function getAccountStats() {
  const res = await fetch(`${BASE}/account/stats`);
  if (!res.ok) throw new Error("Failed to fetch account stats");
  return res.json();
}

import { apiFetch } from "./api";

export async function getActiveOrders() {
  return apiFetch(`${BASE}/orders`);
}

export async function getAddresses() {
  return apiFetch(`${BASE}/account/addresses`);
}

export async function getCards() {
  return apiFetch(`${BASE}/account/cards`);
}

export async function getProfile() {
  return apiFetch(`${BASE}/account/profile`);
}

export async function updateProfile(data: any) {
  return apiFetch(`${BASE}/account/profile`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}