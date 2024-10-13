// src/utils/discord.js

const API_URL = "http://localhost:5000/admin/roles"; // Your admin API endpoint

export async function getAdminUserRoles(userId) {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch admin Discord roles.");
  }

  const data = await res.json();
  return data.roles; // Array of role objects
}
