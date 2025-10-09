import { BASE } from "./api";

export async function getAccountStats() {
  const res = await fetch(`${BASE}/account/stats`);
  if (!res.ok) throw new Error("Failed to fetch account stats");
  return res.json();
}

export async function getActiveOrders() {
  const res = await fetch(`${BASE}/account/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getAddresses() {
  const res = await fetch(`${BASE}/account/addresses`);
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
}

export async function getCards() {
  const res = await fetch(`${BASE}/account/cards`);
  if (!res.ok) throw new Error("Failed to fetch cards");
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${BASE}/account/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(data: any) {
  const res = await fetch(`${BASE}/account/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}