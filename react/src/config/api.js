// Resolve API base URL robustly, supporting values like "http://localhost:3000 || https://backend.example.com"
const raw = (import.meta.env.VITE_API_URL || "").toString().trim();
const candidates = raw
  ? raw.split(/\|\||,/) // allow "||" or comma-separated values
      .map((s) => s.trim())
      .filter(Boolean)
  : [];

const firstValid = candidates.find((u) => /^https?:\/\//i.test(u));

export const API_URL = firstValid || "http://localhost:3000";
