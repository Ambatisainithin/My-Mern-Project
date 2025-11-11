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

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "*",
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
