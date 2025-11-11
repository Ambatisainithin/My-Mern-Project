const e = require("express");
const app = e();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const {
  newuser,
  login,
  createBooking,
  bookingtoadmin,
  getUserBookingStatus,
  updateBookingStatus,
  assignMechanic,
  markBookingDone,
  getMechanicBookings,
} = require("./Controller");
const { verifyToken, authorizeRoles } = require("./middlewear");

app.disable("x-powered-by");
app.use(helmet());
app.use(e.json());

// CORS: support multiple origins and trim accidental spaces in .env
const originEnv = (process.env.CLIENT_ORIGIN || "").trim();
const fromEnv = originEnv ? originEnv.split(/\|\||,/).map((s) => s.trim()).filter(Boolean) : [];
// Always include common local dev origins, even when CLIENT_ORIGIN is set
const devOrigins = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"];
const allowedOrigins = Array.from(new Set([...(process.env.NODE_ENV === 'production' ? [] : devOrigins), ...fromEnv]));

console.log("Allowed origins:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(err.message));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again later." },
});

app.post("/newuser", authLimiter, newuser);
app.post("/login", login);
app.post("/createbooking", verifyToken, createBooking);
app.get(
  "/bookingtoadmin",
  verifyToken,
  authorizeRoles("admin"),
  bookingtoadmin
);

app.patch(
  "/bookings/:id/status",
  verifyToken,
  authorizeRoles("admin"),
  updateBookingStatus
);
app.get("/userstatus", verifyToken, getUserBookingStatus);
app.get("/", (req, res) => {
  res.send("Working backend");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
