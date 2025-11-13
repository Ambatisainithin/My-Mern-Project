// Resolve API base URL robustly, supporting values like "http://localhost:3000 || https://backend.example.com"
const raw = (import.meta.env.VITE_API_URL || "").toString().trim();
const candidates = raw
  ? raw
      .split(/\|\||,/) // allow "||" or comma-separated values
      .map((s) => s.trim())
      .filter(Boolean)
  : [];

// Prefer remote https URLs over localhost when multiple are provided
const preferred =
  candidates.find((u) => /^https?:\/\//i.test(u) && /^https:/i.test(u) && !/localhost|127\.0\.0\.1/i.test(u)) ||
  candidates.find((u) => /^https:/i.test(u)) ||
  candidates.find((u) => /^https?:\/\//i.test(u));

// Strip trailing slashes to avoid double // when composing URLs
const sanitized = (
  preferred || "https://vehiclebookingbackend.vercel.app/"
).replace(/\/+$/, "");

export const API_URL = sanitized;
