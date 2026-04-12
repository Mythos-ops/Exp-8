const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function loginApi(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  return handleResponse(response);
}

export async function getMyProfile(token) {
  const response = await fetch(`${API_BASE}/protected/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function getProtectedArea(token, areaPath) {
  const response = await fetch(`${API_BASE}/protected/${areaPath}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}
